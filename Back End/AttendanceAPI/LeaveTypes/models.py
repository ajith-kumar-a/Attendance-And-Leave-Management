from django.db import models

# Create your models here.


class LeaveType(models.Model):
    type = models.CharField(max_length=50)
    description = models.CharField(max_length=255)