from django.urls import path
from . import views

urlpatterns = [
    path('get_user/<str:username>', views.get_user, name='get_user'),
    path('create_user', views.create_user, name='create_user'),
    path('update_user/<str:username>', views.update_user, name='update_user'),
    path('delete_user/<str:username>', views.delete_user, name='delete_user'),
]