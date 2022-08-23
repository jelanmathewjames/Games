"""
ASGI config for games project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
import django

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import newtictactoe.routing
django.setup()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'games.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            newtictactoe.routing.websocket_urlpatterns,
        )
    )
})
