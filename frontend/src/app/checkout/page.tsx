'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { CreditCard, Truck, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { usePayment } from '@/hooks/usePayment';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const steps = [
  { id: 'shipping', title: 'Shipping', icon: Truck },
  { id: 'billing', title: 'Billing', icon: MapPin },
  { id: 'payment', title: 'Payment', icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const { items, getTotal, clearCart } = useCartStore();
  const { initiatePayment, isLoading } = usePayment();

  useEffect(() => {
    setIsMounted(true);
    // Check for authentication and get user data
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      router.push('/auth/login');
    }
  }, [router]);

  const validateShippingDetails = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: ''
    };
    let isValid = true;

    if (!shippingDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!shippingDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!shippingDetails.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!shippingDetails.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!shippingDetails.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async () => {
    if (!user?.id) {
      toast.error('Please login to continue');
      router.push('/auth/login');
      return;
    }

    switch (currentStep) {
      case 'shipping':
        if (validateShippingDetails()) {
          setCurrentStep('billing');
        } else {
          toast.error('Please fill in all required fields');
        }
        break;
      case 'billing':
        setCurrentStep('payment');
        break;
      case 'payment':
        try {
          const loadingToastId = 'payment-processing';
          toast.loading('Processing your payment...', { id: loadingToastId });

          const result = await initiatePayment({
            amount: getTotal(),
            userId: user.id,
            name: user.name || 'Customer',
            email: user.email,
            description: `Order #${Date.now()}`,
          });

          toast.dismiss(loadingToastId);

          if (result.cancelled) {
            toast.error('Payment cancelled');
            return;
          }

          if (result.success) {
            setIsSuccess(true);
            clearCart();
            
            toast.success('Payment successful!');
            
            setTimeout(() => {
              toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Order Placed Successfully!
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Order ID: {result.orderId}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        toast.dismiss(t.id);
                        router.push('/orders');
                      }}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
                    >
                      View Order
                    </button>
                  </div>
                </div>
              ), { duration: 5000 });
            }, 300);
          } else {
            toast.error(result.error?.description || 'Payment failed. Please try again.');
          }
        } catch (error: any) {
          toast.dismiss('payment-processing');
          toast.error(error.message || 'Payment failed. Please try again.');
        }
        break;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your order has been placed successfully. We'll send you an email confirmation shortly.
            </p>
            <Button onClick={() => router.push('/orders')}>
              View Your Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Steps */}
          <nav className="mb-8">
            <ol className="flex items-center">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`flex items-center ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      currentStep === step.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        currentStep === step.id
                          ? 'bg-primary-100 dark:bg-primary-900'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="ml-4 text-sm font-medium">{step.title}</span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 ml-4">
                      <div className="h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6">
                {currentStep === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingDetails.firstName}
                          onChange={(e) => setShippingDetails({
                            ...shippingDetails,
                            firstName: e.target.value
                          })}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          required
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingDetails.lastName}
                          onChange={(e) => setShippingDetails({
                            ...shippingDetails,
                            lastName: e.target.value
                          })}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          required
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({
                          ...shippingDetails,
                          address: e.target.value
                        })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        required
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails({
                            ...shippingDetails,
                            city: e.target.value
                          })}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          required
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingDetails.postalCode}
                          onChange={(e) => setShippingDetails({
                            ...shippingDetails,
                            postalCode: e.target.value
                          })}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          required
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'billing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="same-as-shipping"
                        className="rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="same-as-shipping" className="ml-2">
                        Same as shipping address
                      </label>
                    </div>
                    {/* Billing form fields */}
                  </motion.div>
                )}

                {currentStep === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 dark:border-gray-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment-method"
                            id="card"
                            className="text-primary-600 focus:ring-primary-500"
                            defaultChecked
                          />
                          <label htmlFor="card" className="ml-3">
                            <span className="block font-medium">Credit Card</span>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">
                              Pay with your credit or debit card
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-8 flex justify-end">
                  <Button onClick={handleContinue} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        {currentStep === 'payment' ? 'Place Order' : 'Continue'}
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-center">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        {item.product.images?.[0]?.url && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-medium">
                      {isMounted ? `$${getTotal().toFixed(2)}` : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}