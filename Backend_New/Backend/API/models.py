from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


# Create your models here.
class Expenserecord(models.Model):
    Amount=models.IntegerField()
    TransactionType=models.CharField(max_length=8)
    Category=models.CharField()
    PaymentType=models.CharField()
    Payedto=models.CharField()
    FromWallet=models.CharField()
    DateandTimePayed=models.DateTimeField()
    def __str__(self):
        return self.Payedto


