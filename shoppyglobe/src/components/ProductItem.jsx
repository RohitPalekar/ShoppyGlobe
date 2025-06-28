import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function ProductItem({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // to calculate discounted price
  const originalPrice = product.price;
  const discountPrice = Math.round(
    originalPrice * (1 - product.discountPercentage / 100)
  );

  // Get cart items from Redux
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  // Handle clicking on product
  const clicked = () => {
    navigate(`/product/${product.id}`);
  };

  // Handle adding to cart (with stopPropagation to prevent navigation)
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingProduct = cartProducts.find((item) => item.id === product.id);
    
    if (existingProduct) {
      toast.info("This item is already in your cart!");
    } else {
      dispatch(addProductToCart(product));
      toast.success("Item added to cart!");
    }
  };

  return (
    <div 
      className="bg-white border rounded-md p-3 flex flex-col h-full cursor-pointer shadow-amber-800 hover:shadow-lg transition"
      onClick={clicked}
    >
      {/* Product image */}
      <div className="h-full overflow-hidden mb-3 rounded">
        <img
          src={product.thumbnail}
          alt="product image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Brand */}
      <h3 className="text-md font-semibold text-gray-800 mb-1">{product.title}</h3>
      <p className="text-sm text-gray-700 mb-2">{product.brand}</p>

      {/* Price display */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-bold text-[#145374]">${discountPrice}</span>
        <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
      </div>

      {/* Rating */}
      <div className="text-yellow-500 text-sm mb-3">
        {"★".repeat(Math.round(product.rating))}
        <span className="text-gray-300">{"★".repeat(5 - Math.round(product.rating))}</span>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className="bg-[#145374] text-white py-1 text-sm rounded hover:bg-[#0e3a56] mt-auto w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;