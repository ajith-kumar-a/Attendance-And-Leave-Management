from rest_framework import serializers
from .models import LeaveRequests,LeaveStatus
from users.models import User
from LeaveTypes.models import LeaveType

class LeaveRequestsSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    leave_type= serializers.PrimaryKeyRelatedField(queryset=LeaveType.objects.all())
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    status=serializers.PrimaryKeyRelatedField(queryset=LeaveStatus.objects.all())
    reason = serializers.CharField(max_length=255)
    
    class Meta:
        model = LeaveRequests
        fields = ['id','user_id','status','reason','start_date','end_date','leave_type']

class LeaveStatusSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=50)

    class Meta:
        model = LeaveStatus
        fields = ['id','status']