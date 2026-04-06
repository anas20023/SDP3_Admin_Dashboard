import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center bg-white border border-gray-100 shadow-2xl relative">
        <button 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X size={20} />
        </button>
        
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <div className="flex gap-4 justify-center">
          <button 
            type="button" 
            className="btn btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 w-28"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-error w-28 text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={!isLoading ? onCancel : undefined}></div>
    </div>
  );
};

export default ConfirmModal;
