# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.utils.text import slugify

# from Roles.models import Role
# # Create your models here.
# def user_image_path(instance, filename):
#     return '/'.join(['uploads', str(instance.username), filename])


# class User(AbstractUser):
#     # profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
#     id = models.IntegerField(primary_key=True)
#     created_at = models.DateTimeField(auto_now_add=True,null=True)
#     updated_at = models.DateTimeField(null=True)
#     role_id = models.ForeignKey(Role,on_delete=models.CASCADE,null=True,related_name='users')
#     full_name = models.SlugField(default='',db_index=True,editable=False)
    
#     def save(self, *args, **kwargs):
#         self.full_name = slugify(f'{self.first_name} {self.last_name}')
#         super().save(*args,**kwargs)



from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

from Roles.models import Role

def user_image_path(instance, filename):
    return '/'.join(['uploads', str(instance.username), filename])

class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(null=True)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, related_name='users')
    full_name = models.SlugField(default='', db_index=True, editable=False)
    
    def save(self, *args, **kwargs):
        self.full_name = slugify(f'{self.first_name} {self.last_name}')
        super().save(*args, **kwargs)
