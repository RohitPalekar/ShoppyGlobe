import { Suspense, lazy } from "react"; 
import { Route, Routes } from "react-router-dom"; 
import Header from "./components/Header"; 
import Home from "./components/Home"; 
import "./App.css"; 
import { ToastContainer } from "react-toastify"; // For popup notifications
import LoadingSpinner from "./components/LoadingSpinner"; // Loading animation

// Lazy loading components so that they load only when needed
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const NotFound = lazy(() => import("./components/NotFound"));
const OrderPlaced = lazy(() => import("./components/OrderPlaced"));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* With this header will be appears on every page */}
      <Header />

      {/* For different routes */}
      <div className="container mx-auto p-4">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Product details page */}
          <Route
            path="/product/:productId"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetail />
              </Suspense>
            }
          />

          {/* Cart page */}
          <Route
            path="/cart"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Cart />
              </Suspense>
            }
          />

          {/* Checkout page */}
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Checkout />
              </Suspense>
            }
          />

          {/* Order placed page */}
          <Route
            path="/order-placed"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <OrderPlaced />
              </Suspense>
            }
          />

          {/* 404 page */}
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>

      {/* Used Toast with time of 1 second for notification */}
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;