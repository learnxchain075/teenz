// @/components/ui/Modal.tsx
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title ,}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;