from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'best_lines', 'best_level', 'best_score']
    
admin.site.register(User, UserAdmin)
