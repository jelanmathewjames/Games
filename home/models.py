from django.db import models

# Create your models here.

class GameRoom(models.Model):
    room_id = models.IntegerField(blank=True,null=True)
    game_name = models.CharField(max_length=20,blank=True,null=True)
    max_members = models.IntegerField(blank=True,null=True)
    current_occupancy = models.IntegerField(default=0)