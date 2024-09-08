from rest_framework import serializers
from .models import Role


class RoleSerializer(serializers.ModelSerializer):
    role_name= serializers.CharField()
    
    class Meta:
        model = Role
        fields = ['id','role_name']