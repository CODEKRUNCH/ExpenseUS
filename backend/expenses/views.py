from django.shortcuts import render
from .models import Expense
# Create your views here.
def expense_list(request):
      expenses = Expense.objects.all()
      return render(request,'expenses/expense_list.html',{'expenses':expenses})

