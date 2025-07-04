import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });
  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-0 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-md uppercase md:text-[16px]">
          The Maya's all around
        </h2>

        <div className="md:mt-5 text-center text-sm uppercase leading-[0.8] md:text-[6rem]">
          <AnimatedTitle
            title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure <b>a</b>ll at one place"
            containerClass="mt-5 !text-black text-center"
          />
        </div>
        <div className="h-dvh w-screen" id="clip">
          <div className="mask-clip-path about-image">
            <img
              src="img/about.webp"
              alt="Background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
