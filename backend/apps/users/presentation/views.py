from django.db import transaction
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.application.use_cases.authentication import AuthenticationService
from users.models import User
from users.presentation.serializers import LoginSerializer, OTPSerializer, RegisterSerializer


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        user = AuthenticationService.register(**data)
        return Response({"message": "Verification code sent to your email.", "email": user.email}, status=status.HTTP_201_CREATED)


class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"].lower()
        code = serializer.validated_data["code"]
        try:
            tokens = AuthenticationService.verify_email(email=email, code=code)
        except (User.DoesNotExist, ValueError):
            return Response({"detail": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Email verified.", **tokens})


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(AuthenticationService.tokens_for(serializer.validated_data["user"]))
