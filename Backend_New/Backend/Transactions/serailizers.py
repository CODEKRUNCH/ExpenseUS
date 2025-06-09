from .models import Transactionrecord,Wallet,Budget
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transactionrecord
        fields='__all__'
        read_only_fields=['user']
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model=Wallet
        fields=['balance']
class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    wallet = WalletSerializer(read_only=True)  # Will show wallet details in response, but not accept input


    total_spent = serializers.SerializerMethodField()
    remaining = serializers.SerializerMethodField()
    is_exceeding = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = [
            'id', 'user', 'name', 'amount', 'wallet', 'category', 'period', 'created_at',
            'end_date', 'total_spent', 'remaining', 'is_exceeding'
        ]
    def get_total_spent(self, obj):
        return obj.total_spent

    def get_remaining(self, obj):
        return obj.remaining

    def get_is_exceeding(self, obj):
        return obj.is_exceeding
    def create(self, validated_data):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication required to create a budget.")

        # Automatically fetch wallet for the user
        try:
            wallet = Wallet.objects.get(user=request.user)
        except Wallet.DoesNotExist:
            raise serializers.ValidationError("Wallet does not exist for this user.")

        validated_data['user'] = request.user
        validated_data['wallet'] = wallet

        return super().create(validated_data)
