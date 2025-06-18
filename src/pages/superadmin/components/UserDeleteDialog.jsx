import React from 'react';

export default function UserDeleteDialog({ open, onCancel, onConfirm }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="font-semibold text-lg mb-2">Are you sure?</div>
        <div className="text-gray-600 mb-4">
          This action cannot be undone. This will permanently delete the user and remove their data from our servers.
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
