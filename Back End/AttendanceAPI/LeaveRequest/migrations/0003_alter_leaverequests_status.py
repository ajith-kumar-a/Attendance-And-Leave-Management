# Generated by Django 3.2.19 on 2024-09-09 23:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('LeaveRequest', '0002_leaverequests_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaverequests',
            name='status',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='leaveRequest', to='LeaveRequest.leavestatus'),
        ),
    ]
