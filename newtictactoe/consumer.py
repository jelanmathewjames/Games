import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.db.models import F
from home.models import GameRoom

class NewTictactoeConsumer(WebsocketConsumer):
    game_on = False
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
        if text['type'] == 'reload':
            self.send(text_data=json.dumps({
                'type':'reload',
                'name': self.scope["url_route"]["kwargs"]["name"]
            }))
        elif text['type'] == 'select_side':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'select_side',
                    'message': text['message']
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
                    'side':text['side']
                }
            )
        '''if text_data['command'] == 'select_side':
            if self.players['player_side'][text_data['info']] == None:
                self.players['player_side'][text_data['info']] = self.channel_name
                self.send(text_data=json.dumps({
                    'type': 'selected',
                    'message':f'You are on',text_data['info'],'side'
                }))
            else:
                self.send(text_data=json.dumps({
                    'type': 'already selected',
                    'message':f'Opponent have already locked {text_data['info']} side'
                }))
                
            
              '''
        '''else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                "type": "send_data"
              
                }
            )'''
        '''self.send(text_data=json.dumps({
            'message':"lose the game"
        }))'''
    def select_side(self, data):
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
            'side':data['side']
        }))      
    def send_data(self,data):
        self.send(text_data=json.dumps({
            'message':"lose the game"
        }))   

    def disconnect(self,code):
        self.disconnect_operation()
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    
    def disconnect_operation(self):
        room = GameRoom.objects.filter(room_id=int(self.room_group_name))
        if room.first().current_occupancy <= 1:
            room.delete()
        else:
            room.update(current_occupancy = F('current_occupancy')-1)
