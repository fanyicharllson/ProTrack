import { X, Check } from "lucide-react";

interface SuccessModalProps {
  setShowModal: (value: boolean) => void;
  text: string;
}

export default function SuccessModal({
  setShowModal,
  text,
}: SuccessModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 "
        onClick={() => setShowModal(false)}
      ></div>

      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6">
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowModal(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close modal</span>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="rounded-full bg-purple-100 p-3">
            <div className="rounded-full bg-purple-600 p-2">
              <Check className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">{`${text} added successfully!`}</h2>
            <p className="text-gray-500 text-sm">{`You can view it in the ${text} history.`}</p>
          </div>

          {/* Button */}
          <button className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-purple-700 transition-colors">
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
