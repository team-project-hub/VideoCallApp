import hashlib
import secrets
from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import EmailOTP, User


class AuthenticationService:
    """Application-level authentication workflows."""

    @staticmethod
    def _hash_otp(code: str) -> str:
        return hashlib.sha256(f"{settings.SECRET_KEY}:{code}".encode()).hexdigest()

    @classmethod
    def issue_email_otp(cls, user: User) -> None:
        code = f"{secrets.randbelow(1_000_000):06d}"
        EmailOTP.objects.filter(user=user, consumed_at__isnull=True).update(consumed_at=timezone.now())
        EmailOTP.objects.create(
            user=user,
            code_hash=cls._hash_otp(code),
            expires_at=timezone.now() + timedelta(minutes=10),
        )
        send_mail(
            "Your Meetly verification code",
            f"Your verification code is {code}. It expires in 10 minutes.",
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )

    @classmethod
    def register(cls, *, email: str, password: str, first_name: str = "", last_name: str = "") -> User:
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_active=False,
        )
        cls.issue_email_otp(user)
        return user

    @classmethod
    def verify_email(cls, *, email: str, code: str) -> dict:
        user = User.objects.get(email=email)
        otp = EmailOTP.objects.filter(user=user, consumed_at__isnull=True).first()
        if not otp or otp.is_expired or otp.attempts >= 5 or not secrets.compare_digest(otp.code_hash, cls._hash_otp(code)):
            if otp:
                otp.attempts += 1
                otp.save(update_fields=("attempts",))
            raise ValueError("Invalid or expired verification code.")
        otp.consumed_at = timezone.now()
        otp.save(update_fields=("consumed_at",))
        user.is_active = True
        user.save(update_fields=("is_active",))
        return cls.tokens_for(user)

    @staticmethod
    def tokens_for(user: User) -> dict:
        refresh = RefreshToken.for_user(user)
        return {"access": str(refresh.access_token), "refresh": str(refresh)}
