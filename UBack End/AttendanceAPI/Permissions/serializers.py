from rest_framework import serializers
from .models import Permisssion


class PermisssionSerializer(serializers.ModelSerializer):
    # role_id = serializers.IntegerField()
    permission_name = serializers.CharField(max_length=255)
    
    class Meta:
        model = Permisssion
        fields = ['id','permission_name']