from .models import Expenserecord
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Expenserecord
        fields='__all__'
        read_only_fields=['user']
        