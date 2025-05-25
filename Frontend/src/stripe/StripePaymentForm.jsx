import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#FFFFFF',
      fontSize: '16px',
      '::placeholder': {
        color: '#CCCCCC',
      },
    },
    invalid: {
      color: '#FF6B6B',
    },
  },
};

const StripePaymentForm = ({ onPaymentSuccess, setPaymentStatus, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPaymentStatus('processing');

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (!error) {
      console.log('Stripe PaymentMethod:', paymentMethod);

      // Simulate payment success (normally you'd send to backend here)
      onPaymentSuccess(amount * 100); // amount in cents
    } else {
      console.error(error.message);
    }

    setPaymentStatus('idle');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, padding: 20 }}>
      <div style={{ backgroundColor: '#1C1C1C', padding: '12px', borderRadius: '4px' }}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <button
        type="submit"
        disabled={!stripe || !amount}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#A33AFF',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Pay ${isNaN(parseFloat(amount)) ? '0.00' : parseFloat(amount).toFixed(2)}

      </button>
    </form>
  );
};

export default StripePaymentForm;
