from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.contrib.auth.models import User


# Create your models here.
class Expenserecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)  # 👈 Add this
    Amount=models.IntegerField()
    TransactionType=models.CharField(max_length=8)
    Category=models.CharField()
    PaymentType=models.CharField()
    Payedto=models.CharField()
    FromWallet=models.CharField()
    DateandTimePayed=models.DateTimeField()
    Note=models.CharField(null=True)
    def __str__(self):
        return self.Payedto


