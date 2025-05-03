import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "@/styles/global.css";
import { useRef } from "react";



gsap.registerPlugin(useGSAP);

const CircularText = () => {
  const textCircleRef = useRef(null);

  useGSAP(() => {
    gsap.to(textCircleRef.current, {
      rotate: 360,
      duration: 5,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });
  }, []);

  return (
    <div className="circle-wrapper">
      <svg width="100" height="100" viewBox="0 0 250 250">
        <defs>
          <path
            id="circlePath"
            d="
              M 125, 125
              m -100, 0
              a 100,100 0 1,0 200,0
              a 100,100 0 1,0 -200,0
            "
          />
        </defs>
        <g ref={textCircleRef}>
          <text fontSize="16" fontFamily="sans-serif" fill="#000">
            <textPath href="#circlePath" startOffset="0%">
              <tspan>HYRCANIA</tspan><tspan dx="14">•</tspan><tspan dx="14">RUNNING CLUB</tspan><tspan dx="14">•</tspan><tspan dx="14">HYRCANIA</tspan><tspan dx="14">•</tspan><tspan dx="14">RUNNING CLUB</tspan><tspan dx="14">•</tspan><tspan dx="14">HYRCANIA</tspan><tspan dx="14">•</tspan>
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default CircularText;
