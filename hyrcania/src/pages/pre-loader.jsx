import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import "@/styles/global.css";
import CircularText from "@/components/circular-text";

const Preloader = () => {
    useGSAP(() => {
        new SplitType('#main-text');
        let tl = gsap.timeline();

        tl.to('.char', {
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "expo.out"
        }).to('.char', {
            y: -100,
            stagger: { each: 0.03, from: "end" }, // reverse the stagger
            delay: 1,
            duration: 0.05,
            ease: "power4.out"
        });
        


    }, []);

    return (
        <div id="header" class="background">
            <h1 id="main-text"  >
                Hyrcania
            </h1>
            <CircularText/>
        </div>
        
    );
};

export default Preloader;

