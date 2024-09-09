from rest_framework import serializers
from .models import Attendance,AttendanceStatus
from users.models import User

class AttendanceSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    status_id = serializers.PrimaryKeyRelatedField(queryset=AttendanceStatus.objects.all())
    remarks = serializers.CharField(max_length=255)
    
    class Meta:
        model = Attendance
        fields = ['id','user_id','status_id','remarks','date','login_time','logout_time']

class AttendanceStatusSerializer(serializers.ModelSerializer):
    status = serializers.CharField(max_length=50)

    class Meta:
        model = AttendanceStatus
        fields = ['id','status']