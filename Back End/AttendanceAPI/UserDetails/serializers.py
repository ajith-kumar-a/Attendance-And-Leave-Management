# userdetails/serializers.py
from rest_framework import serializers
from .models import UserDetails

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['id', 'user', 'date_of_birth', 'mentor_name', 'mobile_number', 'aadhar_number', 'batch', 'blood_group', 'gender']
