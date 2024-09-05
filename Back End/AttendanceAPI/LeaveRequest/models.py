from django.db import models

# Create your models here.
from users.models import User
from LeaveTypes.models import LeaveType

class LeaveStatus(models.Model):
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.status


class LeaveRequests(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='leaveRequest')
    leave_type = models.ForeignKey(LeaveType,on_delete=models.CASCADE,related_name='leaveRequest')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.ForeignKey(LeaveStatus,on_delete=models.CASCADE,related_name='leaveRequest')
    reason = models.TextField(null=True)
