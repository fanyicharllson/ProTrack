import React from "react";

function AddprojectForm({ setShowModal }: { setShowModal: (value: boolean) => void }) {
  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-50"
        onClick={() => setShowModal(false)} // ✅ Close modal when clicking outside
      ></div>

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white px-5 py-4">
        <p>Form element will be displayed here</p>
        <button className="bg-red-500 text-white px-4 py-2" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AddprojectForm;
