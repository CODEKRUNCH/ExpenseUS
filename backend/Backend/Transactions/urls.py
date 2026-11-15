from django.contrib import admin
from django.urls import include,path
from .views import TransactionCreateView,TransactionListView,BalanceView,BudgetCreateView,BudgetListView,BudgetDeleteView

urlpatterns = [
    path('transactioncreate/',TransactionCreateView.as_view(),name='transactioncreate'),
    path('transactionlist/',TransactionListView.as_view(),name='transactionlist'),
    path('balanceview/',BalanceView.as_view(),name='BalanceView'),
    path('budgetcreate/',BudgetCreateView.as_view(),name='budgetcreate'),
    path('budgetlist/',BudgetListView.as_view(),name='budgetlist'),
    path('budgetdelete/<int:pk>/',BudgetDeleteView.as_view(),name='budgetdelete')
]