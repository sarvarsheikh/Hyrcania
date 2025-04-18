import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import persianText from "@/farsiHardCodeText";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    
    setToken(localStorage.getItem("token"));
   
  }, []);
  return (
    <div className="nav-bar flex flex-row h-[50px] w-screen opacity-86 items-center px-7 z-0">
      <Link to="/" className="nav-header font-bold">{persianText.name}</Link>

      {/* <Separator
        style={{ color: "#8D8D8D" }}
        orientation="vertical"
        className="mx-7 opacity-20"
      /> */}

      {/* <div className="flex flex-row gap-x-14">
        <h1 className="nav-bar-text">{persianText.navbar.home}</h1>
        <h1 className="nav-bar-text">{persianText.navbar.categories}</h1>
        <a href="./dashboard">
          <h1 className="nav-bar-text">{persianText.navbar.dashboard}</h1>
        </a>
        <h1 className="nav-bar-text">{persianText.navbar.aboutUs}</h1>
        <h1 className="nav-bar-text">{persianText.navbar.contactUs}</h1>
      </div> */}

      {/* <Separator
        style={{ color: "#8D8D8D" }}
        orientation="vertical"
        className="mx-7 opacity-20"
      /> */}


       
      {/* Avatar positioned at the right end */}
      <div className="ml-auto  text-black  bg-[#C2F66E] p-2 space-x-2 my-2 rounded-full flex items-center  outline-[#C2F66E]">
        {token ? (
          <Link
          to="/profile"
           className="text-sm  font-medium px-2">
            پروفایل
          </Link>
        ) : (
          <Link
            to="/auth"
            className="text-sm font-medium px-2 "
          >
            ورود
          </Link>
        )}
        {/* <Avatar className="w-[25px] h-[25px]">
          <AvatarImage src="https://github.com/sarvarsheikh.png" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
};

export default Navbar;
