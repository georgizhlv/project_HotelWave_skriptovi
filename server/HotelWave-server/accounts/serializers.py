from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        email     = validated_data['email']
        username  = email.split('@')[0]
        password  = validated_data['password']

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user
