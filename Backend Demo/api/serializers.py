from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ["username", "password", "best_lines", "best_level", "best_score"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(
            username=validated_data["username"], # required field
            best_lines = 0,
            best_level = 0,
            best_score = 0,
        )
        user.set_password(validated_data["password"])  # hash password
        user.save()

        return user
    
    def update(self, instance, validated_data):
        instance.best_lines = validated_data.get("best_lines", instance.best_lines)
        instance.best_level = validated_data.get("best_level", instance.best_level)
        instance.best_score = validated_data.get("best_score", instance.best_score)

        if "password" in validated_data:
            instance.set_password(validated_data["password"])  # hash

        instance.save()
        return instance