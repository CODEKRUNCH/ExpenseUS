from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["first_name","last_name","email","password"]
        extra_kwargs={"password":{"write_only":True},"email":{"required":True},"first_name":{"required":True},"last_name":{"required":True}}

    def create(self,validated_data):
        email=validated_data["email"]
        user = User.objects.create_user(
        username=email,              # Use email as username here
        email=email,
        password=validated_data['password'],
        first_name=validated_data.get('first_name', ''),
        last_name=validated_data.get('last_name', ''),
        )
        return user
class UserLoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

    def validate(self,data):
        email=data.get('email')
        password=data.get('password')

        user=authenticate(username=email,password=password)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'user': {
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name
                        }
                    }
        raise serializers.ValidationError("Invalid email or password")
        