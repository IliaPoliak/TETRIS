from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # must provide JWT
def get_user(request, username):
    user = User.objects.filter(username=username).first()
    serializer = UserSerializer(user) # serialize
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])  # open to anyone
def create_user(request):
    serializer = UserSerializer(data=request.data) # deserialize
    
    if serializer.is_valid():
        serializer.save()  # calls UserSerializer.create()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])  # must provide JWT
def update_user(request, username):
    try:
        user = User.objects.get(username=username)   # find user by username
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # use partial=True -> allow partial updates
    serializer = UserSerializer(user, data=request.data, partial=True) # deserializes  

    if serializer.is_valid():
        serializer.save()   # calls UserSerializer.update()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # must provide JWT
def delete_user(request, username):
    try:
        user = User.objects.get(username=username) # find user by username
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    user.delete()

    return Response({"message": f"User '{username}' deleted successfully."}, status=status.HTTP_204_NO_CONTENT)