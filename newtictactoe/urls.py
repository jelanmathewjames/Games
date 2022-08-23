from django.urls import path
from . import views

urlpatterns = [
    path('home',views.newtictactoe_home,name="newtictactoe_home"),
    path('create',views.create,name="newtictactoe_create"),
    path('join',views.join,name="newtictactoe_join")
]