from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

# Create your models here.

class User(AbstractUser):
    profile_picture = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(null=True)
    role = models.CharField(max_length=200,null=True)
    full_name = models.SlugField(default='',db_index=True,editable=False)
    
    def save(self, *args, **kwargs):
        self.full_name = slugify(f'{self.first_name} {self.last_name}')
        super().save(*args,**kwargs)