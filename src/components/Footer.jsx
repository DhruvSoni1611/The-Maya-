// import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// const socialLinks = [
//   { href: "https://discord.com", icon: <FaDiscord /> },
//   { href: "https://twitter.com", icon: <FaTwitter /> },
//   { href: "https://youtube.com", icon: <FaYoutube /> },
//   { href: "https://medium.com", icon: <FaMedium /> },
// ];

// const Footer = () => {
//   return (
//     <footer className="w-screen bg-[#2c2c2c] py-4 text-white">
//       <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
//         <p className="text-center text-sm font-light md:text-left">
//           ©Nova 2024. All rights reserved
//         </p>

//         <div className="flex justify-center gap-4  md:justify-start">
//           {socialLinks.map((link, index) => (
//             <a
//               key={index}
//               href={link.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white transition-colors duration-500 ease-in-out hover:text-black"
//             >
//               {link.icon}
//             </a>
//           ))}
//         </div>

//         <a
//           href="#privacy-policy"
//           className="text-center text-sm font-light hover:underline md:text-right"
//         >
//           Privacy Policy
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#2c2c2c] py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* Left section - Copyright with portfolio link */}
        <div className="text-center text-sm font-light md:text-left">
          <p>
            ©{" "}
            <a
              href="https://dhruv-soni.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 underline decoration-transparent hover:decoration-blue-400"
            >
              Code by Dhruv
            </a>{" "}
            2024.
          </p>
        </div>

        {/* Center section - Social links */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-500 ease-in-out text-lg"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right section - Privacy Policy */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline transition-colors duration-300 md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
