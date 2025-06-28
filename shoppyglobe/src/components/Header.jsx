import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

function Header() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const navigateTo = useNavigate();

  return (
    <header className="bg-[#145374] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold hover:text-white">
          ShoppyGlobe
        </Link>

        {/* Home */}
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart Button with Item Count */}
        <button
          onClick={() => navigateTo("/cart")}
          className="relative p-2 hover:bg-[#0e3a56] rounded-md transition"
          aria-label="Shopping Cart"
        >
          <div className="flex items-center gap-1">
            <FiShoppingCart className="text-lg" />
            {cartProducts.length > 0 && (
              <span className="text-sm bg-white text-[#962625] w-5 h-5 flex items-center justify-center rounded-full">
                {cartProducts.length}
              </span>
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;