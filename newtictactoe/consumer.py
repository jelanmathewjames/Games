import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.db.models import F
from home.models import GameRoom

class NewTictactoeConsumer(WebsocketConsumer):
    players = {'player_side':{},'player_move':{}}
    async def connect(self):
       
        self.room_group_name = self.scope["url_route"]["kwargs"]["room_id"]
        
        self.players['player_side'][self.channel_name] = None
        self.players['player_move'][self.channel_name] = None
        GameRoom.objects.filter(room_id=int(self.room_group_name)).update(current_occupancy = F('current_occupancy')+1)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
    async def receive_json(self, content):
        pass

    async def disconnect(self,code):
        self.disconnect_operation()
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    def disconnect_operation(self):
        room = GameRoom.objects.filter(room_id=int(self.room_group_name))
        if room.first().current_occupancy <= 1:
            room.delete()
        else:
            room.update(current_occupancy = F('current_occupancy')-1)
