import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import persianText from "@/farsiHardCodeText";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (!token || !tokenExpiry) {
        setIsAuthenticated(false);
        return;
      }

      // Check if token has expired
      if (new Date(tokenExpiry) < new Date()) {
        // Token expired, clean up
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        setIsAuthenticated(false);
        return;
      }

      // Token is valid
      setIsAuthenticated(true);
    };

    // Check on initial load
    checkAuthentication();

    // Set up interval to periodically check token validity
    const intervalId = setInterval(checkAuthentication, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="nav-bar flex flex-row h-[50px] w-screen opacity-86 items-center px-7 z-0">
      <Link to="/" className="nav-header font-bold">{persianText.name}</Link>

      {/* Avatar positioned at the right end */}
      <div className="ml-auto text-black bg-[#C2F66E] p-2 space-x-2 my-2 rounded-full flex items-center outline-[#C2F66E]">
        {isAuthenticated ? (
          <Link
            to="/profile"
            className="text-sm font-medium px-2"
          >
            پروفایل
          </Link>
        ) : (
          <Link
            to="/auth"
            className="text-sm font-medium px-2"
          >
            ورود
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;