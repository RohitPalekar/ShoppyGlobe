// This component displays when a route doesn't exist
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* 404 logo */}
      <TbError404 className="w-40 h-40" />
     
      {/* Error message */}
      <h1 className="text-3xl font-bold text-[#145374] mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist
      </p>

      {/* Back to home link */}
      <Link
        to="/"
        className="px-6 py-3 bg-[#145374] text-white rounded-lg hover:bg-[#0e3a56] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;