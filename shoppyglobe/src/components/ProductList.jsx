import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredProducts } from "../redux/slices/productFilterSlice";
import LoadingSpinner from "./LoadingSpinner";

function ProductList() {
  // Used custom fetch hook
  const { data: productData, isLoading, error } = useFetch(
    "https://dummyjson.com/products"
  );
  
  // to manage all products and search
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Redux state for filtered products
  const filteredProducts = useSelector(
    (state) => state.productFilter.filteredProducts
  );
  const dispatch = useDispatch();

  // Update products based on data
  useEffect(() => {
    if (productData?.products) {
      setAllProducts(productData.products);
    }
  }, [productData]);

  // Handle search input changes
  const handleSearchInput = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setIsSearchActive(false);
    }
  };

  // it will perform search and update Redux state
  const executeSearch = () => {
    setIsSearchActive(true);
    dispatch(
      setFilteredProducts(
        allProducts.filter((product) => {
          const matchesSearch =
            product.title?.toLowerCase().includes(searchTerm) ||
            product.brand?.toLowerCase().includes(searchTerm);
          return matchesSearch;
        })
      )
    );
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-bold text-xl">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <form onSubmit={(e) => { e.preventDefault(); executeSearch(); }} className="mb-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#145374]"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <button
            type="submit"
            className="bg-[#145374] text-white px-6 py-2 rounded-r-lg hover:bg-[#0e3a56] transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Products */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isSearchActive
          ? filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : allProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default ProductList;