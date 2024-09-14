from django.db import models
from users.models import User

class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
    date_of_birth = models.DateField()
    mentor_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    aadhar_number = models.CharField(max_length=12, unique=True)
    batch = models.CharField(max_length=100)
    blood_group = models.CharField(max_length=10)
    gender = models.CharField(max_length=10)