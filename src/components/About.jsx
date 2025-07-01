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
        <h2 className="font-general text-sm uppercase md:text-[16px]">
          The Maya's all around
        </h2>

        <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          <AnimatedTitle
            title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
            containerClass="mt-5 !text-black text-center"
          />
        </div>

        {/* <div className="about-subtext">
          <p>The Game of Games begins-your life, now am epic MMOPRG</p>
          <p className="text-gray-500">
            The Maya is everywhere and concurenccy has never been an issue.
          </p>
        </div> */}
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
