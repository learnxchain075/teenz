import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Package } from 'lucide-react';
import Button from '@/components/ui/Button';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId: string;
  product?: {
    name: string;
    images?: Array<{ url: string }>;
  };
}

interface Order {
  id: string;
  orderName: string | null;
  customerName: string;
  date: string;
  total: number;
  orderStatus: string;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    productId: string;
    image?: string;
  }>;
  OrderItem?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    productId: string;
    product?: {
      name: string;
      images?: Array<{ url: string }>;
    };
  }>;
  userId: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus?: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null;

  const orderItems = order.items || order.OrderItem || [];
  const getItemImage = (item: any) => {
    if (item.image) return item.image;
    if (item.product?.images?.[0]?.url) return item.product.images[0].url;
    return null;
  };

  const getItemName = (item: any) => {
    return item.name || item.product?.name || 'Product';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6">
                    Order Details
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{formatDate(order.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            order.orderStatus === 'DELIVERED'
                              ? 'bg-green-100 text-green-800'
                              : order.orderStatus === 'SHIPPED' || order.orderStatus === 'IN_TRANSIT'
                                ? 'bg-blue-100 text-blue-800'
                                : order.orderStatus === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.orderStatus === 'CANCELLED'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                        {order.orderStatus?.replace('_', ' ') || 'UNKNOWN'}

                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                              {getItemImage(item) ? (
                                <img
                                  src={getItemImage(item)}
                                  alt={getItemName(item)}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{getItemName(item)}</p>
                              <p className="text-sm text-gray-500">
                                {formatCurrency(item.price)} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Total Amount</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                    {order.paymentStatus && (
                      <p className="text-sm text-gray-500 mt-1">
                        Payment Status: {order.paymentStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={onClose}>Close</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 