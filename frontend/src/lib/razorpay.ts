declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async ({
  orderId,
  amount,
  currency = 'INR',
  name = 'Teenz',
  description = 'Purchase',
  image = '/logo.png',
  prefillEmail = '',
  prefillContact = '',
  theme = { color: '#6366f1' }
}: {
  orderId: string;
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefillEmail?: string;
  prefillContact?: string;
  theme?: { color: string };
}) => {
  return new Promise((resolve) => {
    const options = {
      key: 'rzp_test_EJh0TkmUgkZNyG',
      amount: amount * 100,
      currency,
      name,
      description,
      image,
      order_id: orderId,
      handler: function (response: any) {
        resolve({ success: true, ...response });
      },
      prefill: {
        email: prefillEmail,
        contact: prefillContact,
      },
      theme,
      modal: {
        ondismiss: function() {
          resolve({ success: false, cancelled: true });
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on('payment.failed', function (resp: any) {
      resolve({ 
        success: false, 
        error: { description: resp.error.description || 'Payment failed' }
      });
    });

    paymentObject.open();
  });
}; 