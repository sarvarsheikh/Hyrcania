
import formateDate from "@/helper/formateDate";
import { useNavigate } from "react-router-dom";

export default function EventCard(props) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-md mx-auto"
      dir="rtl"

    >
      <div className="relative overflow-hidden bg-white border border-black cursor-pointer transition-transform hover:scale-[1.02]">
        {/* Image section - reduced in size for minimalism */}
        <div className="relative h-[160px] w-full">
          <img
            src={props.event.banner_image}
            alt={props.event.title}
            className="object-cover  w-full h-full"
          />
        </div>

        {/* Content section with Swiss typography principles */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-12 gap-4">
            {/* Title area - spans 12 columns */}
            <div className="col-span-12 mb-4">
              <h2 className="text-2xl font-normal tracking-tight text-black">{props.event.title}</h2>
            </div>

            {/* Location - spans 8 columns */}
            <div className="col-span-8">
              <p className="text-sm font-light text-black">{props.event.location}</p>
              <p className="text-sm font-light mt-1 text-black">{formateDate(props.event.datetime_created)}</p>
            </div>

            {/* Button area - spans 4 columns */}
            <div className="col-span-4 flex items-start justify-end">
              <button onClick={() => {
                navigate("/blog", {
                  state: {
                    event: props.event,
                  },
                });
              }} className="border border-black px-4 py-1 text-sm hover:bg-black hover:text-white transition-colors text-black">
                نمایش
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}