import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressManagerProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  onUpdateAddress: (id: number, address: Omit<Address, 'id'>) => Promise<void>;
  onDeleteAddress: (id: number) => Promise<void>;
}

export default function AddressManager({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}: AddressManagerProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingAddressId !== null) {
        await onUpdateAddress(editingAddressId, formData);
      } else {
        await onAddAddress(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setIsLoading(true);
      try {
        await onDeleteAddress(id);
      } catch (error) {
        console.error('Failed to delete address:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
    setEditingAddressId(null);
    setIsAddingAddress(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Addresses</h3>
        {!isAddingAddress && (
          <Button
            variant="outline"
            onClick={() => setIsAddingAddress(true)}
            disabled={isLoading}
          >
            <Plus size={16} className="mr-2" />
            Add New Address
          </Button>
        )}
      </div>

      {isAddingAddress ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : editingAddressId
                ? 'Update Address'
                : 'Add Address'}
            </Button>
          </div>
        </form>
      ) : addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex justify-between items-start p-4 border dark:border-gray-700 rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{address.street}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{address.country}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  disabled={isLoading}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  disabled={isLoading}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
          No addresses added yet.
        </p>
      )}
    </div>
  );
} 