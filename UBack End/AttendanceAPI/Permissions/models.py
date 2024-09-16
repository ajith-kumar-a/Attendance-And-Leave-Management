from django.db import models

# Create your models here.
from Roles.models import Role

class Permisssion(models.Model):
    role_id = models.ForeignKey(Role,on_delete=models.CASCADE,related_name='permissions')
    permission_name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f'{self.role_id} - {self.permission_name}'