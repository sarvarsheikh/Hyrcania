import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import persianText from "@/farsiHardCodeText";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="nav-bar flex flex-row h-[50px] w-screen opacity-86 items-center px-4 md:px-7">
        {/* Logo/Name */}
        <Link to="/" className="nav-header font-bold">
          {persianText.name}
        </Link>

        {/* Separator - Hidden on mobile */}
        <Separator
          style={{ color: "#8D8D8D" }}
          orientation="vertical"
          className="hidden md:block mx-7 opacity-20"
        />

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex flex-row gap-x-8 lg:gap-x-14">
          <h1 className="nav-bar-text">{persianText.navbar.home}</h1>
          <h1 className="nav-bar-text">{persianText.navbar.categories}</h1>
          <a href="./dashboard">
            <h1 className="nav-bar-text">{persianText.navbar.dashboard}</h1>
          </a>
          <h1 className="nav-bar-text">{persianText.navbar.aboutUs}</h1>
          <h1 className="nav-bar-text">{persianText.navbar.contactUs}</h1>
        </div>

        {/* Separator - Hidden on mobile */}
        <Separator
          style={{ color: "#8D8D8D" }}
          orientation="vertical"
          className="hidden md:block mx-7 opacity-20"
        />

        {/* Avatar and Login - Always visible */}
        <div className="ml-auto bg-neutral-700 p-2 space-x-2 my-2 rounded-full flex items-center">
          {token ? (
            <h1 className="text-sm font-medium px-2 hover:text-[#C2F66E]">
              Hi, User
            </h1>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium px-2 hover:text-[#C2F66E]"
            >
              Login and Sign up
            </Link>
          )}
          <Avatar className="w-[25px] h-[25px]">
            <AvatarImage src="https://github.com/sarvarsheikh.png" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          className="ml-4 md:hidden p-1 rounded focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Slides in when active */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden pt-[50px]">
          <div className="flex flex-col items-center py-8 text-center">
            <Link to="/" className="nav-bar-text py-4 w-full hover:bg-neutral-800" onClick={toggleMenu}>
              {persianText.navbar.home}
            </Link>
            <Link to="/" className="nav-bar-text py-4 w-full hover:bg-neutral-800" onClick={toggleMenu}>
              {persianText.navbar.categories}
            </Link>
            <Link to="/dashboard" className="nav-bar-text py-4 w-full hover:bg-neutral-800" onClick={toggleMenu}>
              {persianText.navbar.dashboard}
            </Link>
            <Link to="/" className="nav-bar-text py-4 w-full hover:bg-neutral-800" onClick={toggleMenu}>
              {persianText.navbar.aboutUs}
            </Link>
            <Link to="/" className="nav-bar-text py-4 w-full hover:bg-neutral-800" onClick={toggleMenu}>
              {persianText.navbar.contactUs}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
