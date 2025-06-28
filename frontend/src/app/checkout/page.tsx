'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { CreditCard, Truck, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { usePayment } from '@/hooks/usePayment';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const steps = [
  { id: 'shipping', title: 'Shipping', icon: Truck },
  { id: 'billing', title: 'Billing', icon: MapPin },
  { id: 'payment', title: 'Payment', icon: CreditCard },
];

function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [directBuyProduct, setDirectBuyProduct] = useState<any>(null);
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
  const { items, getSelectedItems, getSelectedTotal } = useCartStore();
  const { initiatePayment, isLoading: paymentLoading } = usePayment();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

        const mode = searchParams.get('mode');
        if (mode === 'buy_now') {
          const buyNowItemStr = sessionStorage.getItem('buyNowItem');
          if (buyNowItemStr) {
            const buyNowItem = JSON.parse(buyNowItemStr);
            setDirectBuyProduct(buyNowItem);
          }
        } else {

          const selectedItems = getSelectedItems();
          if (selectedItems.length === 0) {
            toast.error('Please select items to checkout from your cart');
            router.push('/cart');
            return;
          }
        }

        const token = localStorage.getItem('token');
        if (token) {
          const userRes = await fetch('https://api.teenzskin.com/api/v1/user/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);

            if (userData.Address?.[0]) {
              const address = userData.Address[0];
              setShippingDetails({
                firstName: userData.name.split(' ')[0] || '',
                lastName: userData.name.split(' ').slice(1).join(' ') || '',
                address: address.street || '',
                city: address.city || '',
                postalCode: address.zipCode || ''
              });
            }
          }
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
        toast.error('Failed to load checkout data');
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    };

    fetchData();
  }, [searchParams, router, getSelectedItems]);


  const calculateTotal = () => {
    if (!isMounted) return 0;
    let total = 0;

    if (directBuyProduct) {
      total = directBuyProduct.product.price * directBuyProduct.quantity;
    } else {
      const selectedItems = getSelectedItems();
      total = selectedItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
    }

    return parseFloat(total.toFixed(2));
  };


  const getDisplayItems = () => {
    if (directBuyProduct) {
      return [directBuyProduct];
    }
    return getSelectedItems();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount).replace('₹', '₹ ');
  };

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

  const handlePaymentSuccess = async (result: any) => {
    try {
      const totalAmount = calculateTotal();

      if (!directBuyProduct) {

        const selectedItemIds = new Set(getSelectedItems().map(item => item.product.id));
        const remainingItems = items.filter(item => !selectedItemIds.has(item.product.id));
        useCartStore.setState({ items: remainingItems });
      }


      sessionStorage.removeItem('buyNowItem');
      setIsSuccess(true);


      toast.success('Payment successful!', {
        duration: 2000,
        position: 'top-center',
      });

      // Show detailed order confirmation toast
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
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Total Amount: {formatCurrency(totalAmount)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Items: {directBuyProduct ? 1 : getSelectedItems().length}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  router.push('/products');
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ), { duration: 2000 });
      }, 300);

      // Navigate to products page after a short delay
      setTimeout(() => {
        router.push('/products');
      }, 5000);

    } catch (error) {
      console.error('Error handling payment success:', error);
      toast.error('Error updating cart after payment');
    }
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
          const totalAmount = calculateTotal();

          toast.loading('Processing your payment...', { id: loadingToastId });

          // Format cart items for the API
          const cartItems = directBuyProduct ? [
            {
              productId: directBuyProduct.product.id,
              quantity: directBuyProduct.quantity,
              price: directBuyProduct.product.price
            }
          ] : getSelectedItems().map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          }));

          // Create address if it doesn't exist or has changed
          let addressId = user.Address?.[0]?.id;

          // Check if address details have changed
          const hasAddressChanged = user.Address?.[0] && (
            user.Address[0].street !== shippingDetails.address ||
            user.Address[0].city !== shippingDetails.city ||
            user.Address[0].zipCode !== shippingDetails.postalCode
          );

          if (!addressId || hasAddressChanged) {
            const addressResponse = await fetch('https://api.teenzskin.com/api/v1/address', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                userId: user.id,
                street: shippingDetails.address,
                city: shippingDetails.city,
                state: 'Default State',
                zipCode: shippingDetails.postalCode,
                country: 'Default Country'
              })
            });

            if (!addressResponse.ok) {
              const errorData = await addressResponse.json();
              throw new Error(errorData.error || 'Failed to save address');
            }

            const addressData = await addressResponse.json();
            addressId = addressData.address.id;
          }

          const result = await initiatePayment({
            amount: totalAmount,
            userId: user.id,
            name: user.name || 'Customer',
            email: user.email || '',
            description: `Order for ${cartItems.length} item(s) - Total: ${formatCurrency(totalAmount)}`,
            cartItems: cartItems,
            addressId: addressId,
            total: totalAmount
          });

          toast.dismiss(loadingToastId);

          if (result.cancelled) {
            toast.error('Payment cancelled');
            return;
          }

          if (result.success) {
            handlePaymentSuccess({
              ...result,
              totalAmount
            });
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

  // Save shipping details to localStorage when they change
  useEffect(() => {
    if (isMounted && Object.values(shippingDetails).some(value => value)) {
      localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    }
  }, [shippingDetails, isMounted]);

  // Render nothing until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

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
            <Button onClick={() => router.push('/account/orders')}>
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
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''
                    }`}
                >
                  <div
                    className={`flex items-center ${currentStep === step.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                      }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep === step.id
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
                          className={`w-full px-4 py-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
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
                          className={`w-full px-4 py-2 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
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
                        className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
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
                          className={`w-full px-4 py-2 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
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
                          className={`w-full px-4 py-2 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
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
                            <span className="block font-medium">Razorpay</span>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">
                              Pay with razorpay your choice payment option
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
                  {getDisplayItems().map((item) => (
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
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-medium">
                      ₹{calculateTotal().toFixed(2)}
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

export default dynamic(() => Promise.resolve(CheckoutPage), {
  ssr: false
});