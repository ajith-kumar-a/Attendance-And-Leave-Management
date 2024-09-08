from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from Roles.models import Role

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """UserSerializer to get user details using JWT authentication."""
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "role_id", "email", "password"]
 

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())
 
    class Meta:
        model = User
        fields = ('username', 'password', 'password2','email', 'first_name', 'last_name', 'role_id')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'role_id': {'required': True}
        }
 
    def validate(self, attrs):
        # Validate password match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        
        # Ensure role_id is provided
        if not attrs.get('role_id'):
            raise serializers.ValidationError(
                {"role_id": "This field is required."}
            )
        
        return attrs
 
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role_id=validated_data['role_id'],  
        )
        user.set_password(validated_data['password'])
        user.save()
        return user