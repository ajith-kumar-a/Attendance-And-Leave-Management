from django.db import models

from users.models import User

# Create your models here.

class AttendanceStatus(models.Model):
    status = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.status

class Attendance(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='attendances')
    date = models.DateField(auto_now_add=True,null=True)
    status_id = models.ForeignKey(AttendanceStatus,on_delete=models.CASCADE,related_name='attendances')
    remarks = models.CharField(max_length=255,null=True)
    login_time = models.DateTimeField(auto_now_add=True,null=True)
    logout_time = models.DateTimeField(null=True)

    def __str__(self) -> str:
        return f'{self.user_id} - {self.status}'