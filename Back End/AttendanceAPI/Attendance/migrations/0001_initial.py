# Generated by Django 3.2.19 on 2024-09-04 11:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AttendanceStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, null=True)),
                ('remarks', models.CharField(max_length=255, null=True)),
                ('login_time', models.DateTimeField(auto_now_add=True, null=True)),
                ('logout_time', models.DateTimeField()),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendances', to='Attendance.attendancestatus')),
            ],
        ),
    ]
