import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.db.models import F
from home.models import GameRoom

class NewTictactoeConsumer(WebsocketConsumer):
    game_on = False
    your_turn = False
    def connect(self):
       
        self.room_group_name = self.scope["url_route"]["kwargs"]["room_id"]
        
        room = GameRoom.objects.filter(room_id=int(self.room_group_name))
        if room:
            room.update(current_occupancy = F('current_occupancy')+1)
        else:
            GameRoom.objects.create(room_id=int(self.room_group_name),current_occupancy=1,max_members=2)
        
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()


    def receive(self, text_data):
        
        text = json.loads(text_data)
        if text['type'] == 'winner_declaration':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'winner_declaration',
                    'name':self.scope['url_route']['kwargs']['name']
                }
            )
        elif text['type'] == 'movement_after_setting':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'movement_after_setting',
                    'name':self.scope['url_route']['kwargs']['name'],
                    'move_icon':text['move_icon'],
                    'position_icon':text['position_icon'],
                    'button':text['button']
                }
            )
        elif text['type'] == 'check_turn':
            is_your_turn = False
            if self.your_turn:
                is_your_turn = True
            self.send(text_data=json.dumps({
                'type':'check_turn',
                'is_your_turn': is_your_turn,
                'button':text['button']
            }))
        elif text['type'] == 'movement':
            if self.your_turn:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'movement',
                        'name' : self.scope['url_route']['kwargs']['name'],
                        'button': text['button'],
                        'your_side': text['your_side']
                    }
                )
            else:
                self.send(text_data=json.dumps({
                    'type': 'not_your_turn'
                }))
        elif text['type'] == 'reload':
            self.send(text_data=json.dumps({
                'type':'reload',
                'name': self.scope["url_route"]["kwargs"]["name"]
            }))
        elif text['type'] == 'select_side':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'select_side',
                    'message': text['message'],
                    'name': self.scope["url_route"]["kwargs"]["name"]
                }
            )
        elif text['type'] == 'opponent':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'opponent',
                    'message': self.scope["url_route"]["kwargs"]["name"]
                }
            )
        elif text['type'] == 'reload_opponent':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'reload_opponent',
                    'message': self.scope["url_route"]["kwargs"]["name"],
                }
            )
    def winner_declaration(self, data):
        self.your_turn = False
        self.game_on = False
        self.send(text_data=json.dumps({
            'type':'winner_declaration',
            'name':data['name']
        }))
    def movement(self, data):
        turn = ''
        if data['name'] == self.scope['url_route']['kwargs']['name']:
            self.your_turn = False
            turn = 'your'
        else:
            self.your_turn = True
            turn = 'opponent'
        self.send(text_data=json.dumps({
            'type':'movement',
            'turn':turn,
            'button':data['button'],
            'player_side':data['your_side']
        }))
    def movement_after_setting(self, data):
        turn = ''
        if data['name'] == self.scope['url_route']['kwargs']['name']:
            self.your_turn = False
            turn = 'your'
        else:
            self.your_turn = True
            turn = 'opponent'
        self.send(text_data=json.dumps({
            'type':'movement_after_setting',
            'turn':turn,
            'move_icon':data['move_icon'],
            'position_icon':data['position_icon'],
            'button':data['button']
        }))
    def select_side(self, data):
        self.game_on = True
        if data['name'] == self.scope['url_route']['kwargs']['name']:
            if data['message'] == 'X':
                self.your_turn = True
        else:
            if data['message'] == 'O':
                self.your_turn = True
        self.send(text_data=json.dumps({
            'type':'select_side',
            'message':data['message']
        }))
    def opponent(self,data):
        self.send(text_data=json.dumps({
            'type':'opponent',
            'name': data['message']
        }))
    def reload_opponent(self,data):
        self.send(text_data=json.dumps({
            'type':'reload_opponent',
            'name': data['message'],
        }))      
    def reload_before_game_on(self,data):
        self.send(text_data=json.dumps({
            'type':'reload_before_game_on',
            'name':data['name']
        })) 
    def reload_after_game_on(self,data):
        self.your_turn = False
        self.game_on = False
        self.send(text_data=json.dumps({
            'type':'reload_after_game_on',
            'name': data["name"]
        }))
    def disconnect(self,code):
        self.disconnect_operation()
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    
    def disconnect_operation(self):
        if self.game_on == True:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'reload_after_game_on',
                    'name':self.scope["url_route"]["kwargs"]["name"]
                }
            )
        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'reload_before_game_on',
                    'name':self.scope['url_route']['kwargs']['name']
                }
            )
        room = GameRoom.objects.filter(room_id=int(self.room_group_name))
        if room.first().current_occupancy <= 1:
            room.delete()
        else:
            room.update(current_occupancy = F('current_occupancy')-1)
