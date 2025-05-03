from django.db import models

# Create your models here.
class Expense(models.Model):
    objects = None
    expense_text=models.CharField(max_length=200)
    expense_amount=models.IntegerField("Amount Spent")
    expense_date=models.DateTimeField("Expense Date")

    def __str__(self):
        return self.expense_text
    def date_publish(self):
        return self.expense_date

