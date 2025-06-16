from .models import Transactionrecord,Wallet,Budget
from rest_framework import serializers


class TransactionSerializer(serializers.ModelSerializer):
    # This field is only for user input
    FromWalletName = serializers.CharField(write_only=True)
    # This field is read-only so it won’t be expected in the input
    FromWallet = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Transactionrecord
        # Notice we do NOT include FromWallet in the input fields
        fields = [
            'Amount',
            'TransactionType',
            'Category',
            'PaymentType',
            'Payedto',
            'DateandTimePayed',
            'FromWallet',      # Returned in the response but not expected from input
            'FromWalletName'   # Used to derive the wallet behind the scenes
        ]

    def validate(self, data):
        user = self.context['request'].user
        wallet_name = data.pop('FromWalletName', None)

        if not wallet_name:
            raise serializers.ValidationError({"FromWalletName": "This field is required."})

        try:
            # Adjust the lookup field as needed
            wallet = Wallet.objects.get(user=user, type=wallet_name)
        except Wallet.DoesNotExist:
            raise serializers.ValidationError({"FromWalletName": "Wallet not found for user."})

        # Pass the actual Wallet instance into validated_data
        data['FromWallet'] = wallet
        return data

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model=Wallet
        fields=['balance']
class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    wallet = WalletSerializer(read_only=True)  # Will show wallet details in response, but not accept input
    wallet_type = serializers.CharField(write_only=True)  # Accept "Primary" or "Savings" in request


    total_spent = serializers.SerializerMethodField()
    remaining = serializers.SerializerMethodField()
    is_exceeding = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = [
            'id', 'user', 'name', 'amount','wallet', 'wallet_type', 'category', 'period', 'created_at',
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

        wallet_type = validated_data.pop('wallet_type', None)
        if not wallet_type:
            raise serializers.ValidationError({"wallet_type": "This field is required."})

        try:
            wallet = Wallet.objects.get(user=request.user, type=wallet_type)
        except Wallet.DoesNotExist:
            raise serializers.ValidationError(
                {"wallet_type": f"No wallet found with type '{wallet_type}' for this user."})

        validated_data['user'] = request.user
        validated_data['wallet'] = wallet

        return super().create(validated_data)
