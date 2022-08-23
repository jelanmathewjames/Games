from django.shortcuts import render
from django.http import JsonResponse
from  home.models import GameRoom
import math
import random
# Create your views here.
def newtictactoe_home(request):
    return render(request,'newtictactoe.html')

def create(request):
    if request.method == 'GET':
        digits = "7483921065"
        OTP = ""
        for i in range(6):
            OTP += digits[math.floor(random.random()*10)]

        GameRoom.objects.create(room_id=OTP,game_name='newtictactoe',max_members=2)
        return JsonResponse(
            {'code':str(OTP)},
            safe = False
        )

        
def join(request):
    if request.method == 'GET':
        room_id = request.GET['room_id']
        room_details = GameRoom.objects.filter(room_id=room_id).first()
        if room_details:
            if not room_details.current_occupancy >= room_details.max_members:
                return JsonResponse(
                    {'success':'true',
                     'code':room_id},
                     safe = False
                )
            else:
                return JsonResponse(
                    {'success':'full'},
                    safe = False
                )
        else:
            return JsonResponse(
                {'success':'false'},
                safe = False
            )