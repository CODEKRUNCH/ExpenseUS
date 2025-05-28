from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer,UserLoginSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
class LoginUserView(APIView):
    permission_classes=[AllowAny]
    
    def post(self,request):
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({
                "message": "Login successful",
                "tokens": {
                    "refresh": serializer.validated_data['refresh'],
                    "access": serializer.validated_data['access'],
                },
                "user": serializer.validated_data['user']
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)