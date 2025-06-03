import { useState } from 'react';
import { loadRazorpayScript, initializeRazorpayPayment } from '@/lib/razorpay';
import { toast } from 'react-hot-toast';

interface PaymentDetails {
  amount: number;
  userId: string | number;
  couponCode?: string;
  email?: string;
  contact?: string;
  name?: string;
  description?: string;
}

interface OrderResponse {
  success: boolean;
  error?: string;
  razorpayOrder: {
    id: string;
    amount: number;
  };
  dbOrder: {
    id: string;
  };
}

interface PaymentResponse {
  success: boolean;
  error?: {
    description: string;
  };
  razorpay_payment_id?: string;
  cancelled?: boolean;
  orderId?: string;
  orderName?: string;
}

interface VerificationResponse {
  success: boolean;
  error?: string;
  orderName?: string;
}

interface RazorpayResponse {
  success: boolean;
  cancelled?: boolean;
  razorpay_payment_id?: string;
  error?: {
    description: string;
  };
}

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (details: PaymentDetails) => {
    try {
      
      const payload = {
        amount: Number(details.amount),
        userId: Number(details.userId),
        couponCode: details.couponCode
      };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:5000/api/v1/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("object", error);
        throw new Error(error.error || 'Failed to create order');
      }

      return await response.json() as OrderResponse;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    amount: number;
    method: string;
    currency: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:5000/api/v1/payment/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Payment verification failed');
      }

      return await response.json() as VerificationResponse;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const initiatePayment = async (details: PaymentDetails): Promise<PaymentResponse> => {
    try {
      setIsLoading(true);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const orderData = await createOrder(details);
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const paymentResponse = await initializeRazorpayPayment({
        orderId: orderData.razorpayOrder.id,
        amount: orderData.razorpayOrder.amount / 100, 
        name: details.name || 'Your Store',
        description: details.description || 'Purchase',
        prefillEmail: details.email,
        prefillContact: details.contact,
      }) as RazorpayResponse;

      if (paymentResponse.cancelled) {
        setIsLoading(false);
        return { success: false, cancelled: true };
      }

      if (!paymentResponse.success || !paymentResponse.razorpay_payment_id) {
        const errorMessage = paymentResponse.error?.description || 'Payment failed';
        setIsLoading(false);
        throw new Error(errorMessage);
      }

      const verificationResponse = await verifyPayment({
        razorpay_order_id: orderData.razorpayOrder.id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        amount: orderData.razorpayOrder.amount / 100,
        method: 'razorpay',
        currency: 'INR',
      });

      if (!verificationResponse.success) {
        throw new Error('Payment verification failed');
      }

      setIsLoading(false);
      return { 
        success: true, 
        orderId: orderData.dbOrder.id,
        orderName: verificationResponse.orderName 
      };
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    initiatePayment,
    isLoading,
  };
}; 