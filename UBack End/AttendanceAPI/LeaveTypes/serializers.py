from rest_framework import serializers
from .models import LeaveType


class LeaveTypeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=255)
    
    class Meta:
        model = LeaveType
        fields = ['id','type','description']