from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    best_lines = models.IntegerField(blank=True, null=True)
    best_level = models.IntegerField(blank=True, null=True)
    best_score = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.username