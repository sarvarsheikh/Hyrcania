import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const StripGreen = ()=>{
    const marqueeRef = useRef();
    const containerRef = useRef();
  
    // Update the GSAP animation to use ScrollTrigger
    useGSAP(() => {
      const marqueeElement = marqueeRef.current;
      
      if (marqueeElement) {
        // Create a horizontal scrolling animation that's linked to page scroll
        gsap.to(marqueeElement, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Animation starts when top of section hits bottom of viewport
            end: "bottom top", // Animation ends when bottom of section hits top of viewport
            scrub: 1, // Smooth scrubbing effect (1 second lag)
            markers: false // Set to true for debugging
          }
        });
      }
    }, []);
    return (<div ref={containerRef} className="w-full relative overflow-hidden text-[#2B2B2B]">
        <div 
        className="h-8 sm:h-10 md:h-12 lg:h-14"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontFamily: "Organetto",
          backgroundColor: "#C4FF1A",
       
        }}>
          <div
            ref={marqueeRef}
              className="my-1"
            style={{
              display: "inline-block",
              fontSize: "clamp(1.2rem, 4vw, 2rem)",
              fontWeight: "bold",
              width: "200%" // Make it twice as wide to allow for scrolling
            }}
          >
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">HYRCANIA</span>
            
            
          </div>
        </div>
      </div>);
}
export default StripGreen;