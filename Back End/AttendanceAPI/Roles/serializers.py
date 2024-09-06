from rest_framework import serializers
from .models import Role
# from author.serializers import AuthorSerializer

class RoleSerializer(serializers.ModelSerializer):
    # role_name= serializers.CharField(write_only=True)
    # author = AuthorSerializer(read_only = True)
    class Meta:
        model = Role
        fields = ['id','role_name']