from django.urls import path
from . import views

urlpatterns = [
    path('home',views.home,name="newtictactoe_home"),
    path('create',views.create,name="newtictactoe_create"),
    path('join',views.join,name="newtictactoe_join"),
    path('play',views.play,name="newtictactoe_play"),
]