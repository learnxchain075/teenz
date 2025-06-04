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

interface RazorpayOptions {
  orderId: string;
  amount: number;
  name: string;
  description: string;
  prefillEmail?: string;
  prefillContact?: string;
}

export const initializeRazorpayPayment = (options: RazorpayOptions): Promise<any> => {
  return new Promise((resolve) => {
    // Convert amount to paise for Razorpay
    const amountInPaise = Math.round(parseFloat(options.amount.toString()) * 100);
    
    const rzp = new (window as any).Razorpay({
      key: 'rzp_test_EJh0TkmUgkZNyG',
      amount: amountInPaise, // Amount in paise
      currency: 'INR',
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      handler: function (response: any) {
        resolve({
          success: true,
          ...response,
        });
      },
      modal: {
        ondismiss: function () {
          resolve({ success: false, cancelled: true });
        },
      },
      prefill: {
        email: options.prefillEmail,
        contact: options.prefillContact,
      },
      theme: {
        color: '#6366f1',
      },
    });
    rzp.open();
  });
}; 