import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function CartItem({ item }) {
  const dispatch = useDispatch();

  // To calculate discounted price
  const originalPrice = item.price;
  const discountedPrice = Math.round(
    originalPrice * (1 - item.discountPercentage / 100)
  );

  // to handle quantity changes
  const handleDecrease = () => {
    if (item.quantity === 1) {
      toast.warning("Item removed from cart");
    }
    dispatch(decreaseQuantity(item.id));
  };

  const handleIncrease = () => {
    if (item.quantity >= item.stock) {
      toast.error(`Only ${item.stock} available in stock`);
      return;
    }
    dispatch(increaseQuantity(item.id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-md bg-white">
      {/* Product image */}
      <div className="w-full md:w-1/4 h-32">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product details */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.brand}</p>
        
        {/* Rating */}
        <div className="flex items-center my-1 text-yellow-400">
          {"★".repeat(Math.round(item.rating))}
          {"☆".repeat(5 - Math.round(item.rating))}
        </div>

        {/* Price */}
        <div className="my-2">
          <span className="text-[#145374] font-bold">
            ${discountedPrice * item.quantity}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            (${discountedPrice} each)
          </span>
        </div>

        {/* Quantity + - */}
        <div className="flex items-center gap-3 my-2">
          <button
            onClick={handleDecrease}
            className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;