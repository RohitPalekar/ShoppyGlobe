import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

function Checkout() {
  // To get cart products from Redux
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Here total price was calculated discounted
  const totalPrice = cartProducts.reduce((sum, item) => {
    const itemPrice = Math.round(
      item.price * (1 - item.discountPercentage / 100) * item.quantity
    );
    return sum + itemPrice;
  }, 0);

  // Handle order placement
  const placeOrder = () => {
    const confirmed = window.confirm("Confirm your order?");
    if (confirmed) {
      dispatch(clearCart());
      navigate("/order-placed"); 
    } else {
      toast.info("Order not placed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold text-[#145374] mb-6">Checkout :</h1>

      {/* Order summary */}
      <div className="bg-white border rounded-md p-6 mb-6">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {cartProducts.map((item) => (
            <div key={item.id} className="py-3 flex justify-between">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ${Math.round(
                    item.price * (1 - item.discountPercentage / 100)
                  )}
                </p>
              </div>
              <div className="font-medium">
                ${Math.round(
                  item.price * (1 - item.discountPercentage / 100) * item.quantity
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total price */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Shipping information */}
      <div className="bg-white border rounded-md p-6 mb-6">
        <h2 className="font-semibold mb-4">Shipping Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007387]"
                required
              />
            </div>
          </div>
        </form>
      </div>

      {/* Payment method */}
      <div className="bg-white border rounded-md p-6 mb-6">
        <h2 className="font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="credit-card"
              name="payment"
              className="mr-2"
              defaultChecked
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="paypal" name="payment" className="mr-2" />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="cod" name="payment" className="mr-2" />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>
      </div>

      {/* Place order button */}
      <button
        onClick={placeOrder}
        className={"w-full py-2 rounded font-medium bg-[#145374] text-white hover:bg-[#0e3a56] transition"}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;