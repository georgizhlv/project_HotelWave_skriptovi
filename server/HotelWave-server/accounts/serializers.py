from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

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
        email = validated_data['email']
        username = email.split('@')[0]
        password = validated_data['password']
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# ----------------------------------------------
# Обновен MyTokenObtainPairSerializer:
# ----------------------------------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Премахваме полето username_field и въвеждаме email
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # TokenObtainPairSerializer дефинира полето username_field (по подразбиране 'username').
        # Ние ще го премахнем и ще добавим вмъкнем поле email.

        # 1) Премахваме полето, което идва от parent-а (username)
        username_field = self.username_field  # обикновено 'username'
        self.fields.pop(username_field, None)

        # 2) Добавяме email
        self.fields['email'] = serializers.EmailField(write_only=True)

    def validate(self, attrs):
        # attrs вече съдържа 'email' и 'password'
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('No active account found with the given credentials')

        if not user.check_password(password):
            raise serializers.ValidationError('No active account found with the given credentials')

        # Подменяме attrs така, че parent.validate() да получи 'username'
        attrs[self.username_field] = user.username

        return super().validate(attrs)

