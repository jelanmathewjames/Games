from django.urls import path
from . import consumer

websocket_urlpatterns = [
    path("newtictactoe/<room_id>",consumer.NewTictactoeConsumer.as_asgi())
]