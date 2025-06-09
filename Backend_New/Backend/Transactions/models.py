from datetime import timezone

from django.db import models
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.models import User



class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username}'s Wallet"
class Budget(models.Model):
    PERIOD_CHOICES=[
        ('Week', 'Week'),
        ('Month', 'Month'),
        ('Year', 'Year'),
    ]

    CATEGORY_CHOICES = [
        ('Food & Drinks', 'Food & Drinks'),
        ('Entertainment', 'Entertainment'),
        ('Groceries', 'Groceries'),
        ('Utilities', 'Utilities'),
        ('Transport', 'Transport'),
        ('Health', 'Health'),
        ('Other', 'Other'),
    ]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=30, decimal_places=2)
    wallet = models.ForeignKey(Wallet,on_delete=models.CASCADE)
    category  = models.CharField(max_length=20,choices=CATEGORY_CHOICES)
    period = models.CharField(choices=PERIOD_CHOICES)
    created_at=models.DateTimeField(auto_now_add=True)

    end_date = models.DateField(null=True, blank=True)
    def __str__(self):
        return (f"{self.name}-{self.amount}({self.period})")

    @property
    def start_date(self):
        return self.created_at.date()
    @property
    def total_spent(self):
        query_end=self.end_date if self.end_date else timezone.now().date()
        transactions = Transactionrecord.objects.filter(
            user=self.user,
            Category=self.category,
            FromWallet=self.wallet,
            TransactionType='Expense',
            DateandTimePayed__date__gte=self.start_date,
            DateandTimePayed__date__lte=query_end
        )
        return sum(t.Amount for t in transactions)
    @property
    def remaining(self):
        return self.amount - self.total_spent
    @property
    def is_exceeding(self):
        return self.total_spent>self.amount

    def save(self, *args, **kwargs):
        # Auto-calculate end_date if not set
        if not self.end_date:
            if self.period.lower() == 'week':
                self.end_date = timezone.now().date() + timedelta(weeks=1)
            elif self.period.lower() == 'month':
                self.end_date = timezone.now().date() + timedelta(days=30)
            elif self.period.lower() == 'year':
                self.end_date = timezone.now().date() + timedelta(days=365)
        super().save(*args, **kwargs)

class Transactionrecord(models.Model):
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
    def save(self, *args, **kwargs):
        if not self.pk:  # Only for new transactions
            if self.TransactionType.lower() == 'expense':
                self.user.wallet.balance -= self.Amount
            elif self.TransactionType.lower() == 'income':
                self.user.wallet.balance += self.Amount
            self.user.wallet.save()
        super().save(*args, **kwargs)

