import { Link } from "react-router-dom";
import { IoBagCheck } from "react-icons/io5";

function OrderPlaced() {
  // This component shows order confirmation page
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center bg-white border rounded-lg p-8 max-w-md">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <IoBagCheck className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-block w-full bg-[#145374] text-white py-2 rounded hover:bg-[#0e3a56]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;