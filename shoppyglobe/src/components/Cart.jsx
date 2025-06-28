
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart() {
  // To get cart products from Redux store
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const navigate = useNavigate();

  // To calculate discounted total price
  const totalPrice = cartProducts.reduce((sum, item) => {
    const itemPrice = Math.round(
      item.price * (1 - item.discountPercentage / 100) * item.quantity 
    );
    return sum + itemPrice;
  }, 0);

  // Go to checkout page
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold text-[#145374] mb-6">Cart :</h1>
      
      {cartProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#145374] text-white px-6 py-2 rounded hover:bg-[#0e3a56]"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartProducts.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 border rounded-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
            <button
              onClick={proceedToCheckout}
              className="w-full bg-[#145374] text-white py-2 rounded hover:bg-[#0e3a56] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;