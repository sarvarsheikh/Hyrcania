import Discord from "@/assets/Discord";
import Instagram from "@/assets/Instagram";
import Linkdin from "@/assets/Linkdin";
import Telegram from "@/assets/Telegram";
import persianText from "@/farsiHardCodeText"

const EndSection = () => {
  return (
    <div className="footer flex flex-row justify-end p-5">
      <div className="flex flex-col mr-auto ml-20 ">
        <div className="space-y-4 justify-items-end">
          <h1 className="footer-header">{persianText.name}</h1>
          <div className="flex flex-row items-center gap-x-3">
            <Telegram className="" />
            <Discord className="" />
            <Instagram className="" />
            <Linkdin className="" />
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-4 gap-x-10 justify-items-end">
          <h1 className="footer-text">{persianText.footer.aboutUs}</h1>
          <h1 className="footer-text">{persianText.footer.termsOfUse}</h1>
          <h1 className="footer-text">{persianText.footer.contactUs}</h1>
          <h1 className="footer-text">{persianText.footer.becomeASponsor}</h1>
          <h1 className="footer-text">{persianText.footer.charityAndDonations}</h1>
          <h1 className="footer-text">{persianText.footer.helpCenterFaqs}</h1>
        </div>
    </div>
  );
};
export default EndSection;
