import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';

const PUBLIC_KEY = 'pk_test_51RJsPRQOM7G2T7Bngci13SYkkf10gu9RnfPMslX2FvAFt4qn4zOy831jb2ZZ9gCvd3mlKGdbAQs2RTVnOBMiYfVY00tssK7jNn'; // Replace with real key
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ onPaymentSuccess, setPaymentStatus, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        onPaymentSuccess={onPaymentSuccess}
        setPaymentStatus={setPaymentStatus}
        amount={amount}
      />
    </Elements>
  );
};

export default StripeContainer;
