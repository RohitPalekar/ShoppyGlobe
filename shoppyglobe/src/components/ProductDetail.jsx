import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../redux/slices/cartSlice";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

function ProductDetail() {
  const { productId } = useParams(); // To get product ID from URL
  
  // To Fetch product data custom hook
  const { data: productData, isLoading, error } = useFetch(
    `https://dummyjson.com/products/${productId}`
  );
  
  // To calculate discounted price
  const originalPrice = productData?.price || 0;
  const discountPrice = Math.round(
    originalPrice * (1 - (productData?.discountPercentage || 0) / 100)
  );

  // Cart functionality
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const handleAddToCart = () => {
    const existingProduct = cartProducts.find(
      (item) => item.id === productData.id
    );
    
    if (existingProduct) {
      toast.info("This item is already in your cart!");
    } else {
      dispatch(addProductToCart(productData));
      toast.success("Item added to cart!");
    }
  };

  // for loading and for error if ocuur
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading product details</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white border p-6 rounded-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product image */}
        <div className="md:w-1/2">
          <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={productData.thumbnail}
              alt={productData.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product details */}
        <div className="md:w-1/2">
          <h1 className="text-xl font-bold text-gray-800">{productData.title}</h1>
          <p className="text-md text-gray-600 mb-2">by {productData.brand}</p>

          {/* Ratings */}
          <div className="text-yellow-500 text-lg mb-4">
            {"★".repeat(Math.round(productData.rating))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(productData.rating))}
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-xl font-bold text-[#145374]">
              ${discountPrice}
            </span>
            <span className="ml-2 text-gray-400  line-through">
              ${originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4">{productData.description}</p>

          {/* Additional details */}
          <div className="grid grid-cols-2  gap-3 text-sm text-gray-700 mb-6">
            <div><strong>Category:</strong> {productData.category}</div>
            <div><strong>Stock:</strong> {productData.stock} available</div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={"w-full py-2 rounded-md font-medium bg-[#145374] text-white hover:bg-[#0e3a56]  transition"}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;