from django.contrib import admin
from django.urls import include,path
from .views import TransactionCreateView,TransactionListView

urlpatterns = [
    path('transactioncreate/',TransactionCreateView.as_view(),name='transactioncreate'),
    path('transactionlist/',TransactionListView.as_view(),name='transactionlist')
]