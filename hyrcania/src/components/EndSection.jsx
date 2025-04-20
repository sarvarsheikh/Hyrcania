import Discord from "@/assets/Discord";
import Instagram from "@/assets/Instagram";
import Linkdin from "@/assets/Linkdin";
import Telegram from "@/assets/Telegram";
import persianText from "@/farsiHardCodeText";
import { Link } from "react-router-dom";

const EndSection = () => {
  return (
    <div className="footer text-white  w-full h-full">
      {/* Top section with logo and social icons */}
      <div className="px-4 py-6 flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-xl font-bold">{persianText.name}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Telegram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
          <Discord className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
          <Instagram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
          <Linkdin className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Footer links - match the 2x2 grid in the image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full text-sm text-gray-300">
        <div className="px-4">
          <div className="p-4">
            <Link to="/about" className="block py-1 hover:text-white">{persianText.footer.aboutUs}</Link>
          </div>
          <div className="p-4">
            <Link to="/term" className="block py-1 hover:text-white">{persianText.footer.termsOfUse}</Link>
          </div>
          <div className="p-4">
            <a href="https://zarinp.al/hyrcaniarun.ir" className="block py-1 hover:text-white">کمک‌های مالی</a>
          </div>
        </div>
        <div className="px-4">
          <div className="p-4">
            <Link to="/contact" className="block py-1 hover:text-white">{persianText.footer.contactUs}</Link>
          </div>
          <div className="p-4">
            <a href="#" className="block py-1 hover:text-white">{persianText.footer.becomeASponsor}</a>
          </div>
          <div className="p-4">
            <a href="#" className="block py-1 hover:text-white">{persianText.footer.helpCenterFaqs}</a>
          </div>
        </div>
      </div>

      {/* Copyright section - optional */}
      <div className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} {persianText.name}. {persianText.footer.allRightsReserved}
      </div>
    </div>
  );
};

export default EndSection;