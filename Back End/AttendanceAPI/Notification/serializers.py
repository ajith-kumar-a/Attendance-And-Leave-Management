# serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message']
        extra_kwargs = {
            'user': {'required': False, 'read_only': True},  # user field is read-only
        }
