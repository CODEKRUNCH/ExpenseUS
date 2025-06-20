# Generated by Django 5.2.1 on 2025-06-09 20:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Transactions', '0011_wallet_type_alter_wallet_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='category',
            field=models.CharField(choices=[('Total', 'Total'), ('Food & Drinks', 'Food & Drinks'), ('Entertainment', 'Entertainment'), ('Groceries', 'Groceries'), ('Rent', 'Rent'), ('Utilities', 'Utilities'), ('Transport', 'Transport'), ('Shopping', 'Shopping'), ('Health', 'Health'), ('Other', 'Other')], max_length=20),
        ),
        migrations.AlterField(
            model_name='transactionrecord',
            name='FromWallet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Transactions.wallet'),
        ),
    ]
