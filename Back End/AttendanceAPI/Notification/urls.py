# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

router = DefaultRouter()
router.register(r'', NotificationViewSet, basename='notification')

urlpatterns = [
    path('user/<int:user_id>/', NotificationViewSet.as_view({'get': 'list', 'post': 'create'}), name='notification-list-create'),
    path('user/<int:user_id>/<int:pk>/', NotificationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='notification-detail'),
]
