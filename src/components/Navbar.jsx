import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiDatabase,
  FiGlobe,
  FiLayout,
  FiLogIn,
  FiMessageSquare,
} from "react-icons/fi";

const navItems = ["About", "Contact"];
// const navItems = [
//   { name: "About", href: "#about" },
//   { name: "Contact", href: "#contact" },
// ];

const DropdownMenu = ({ title, children, isOpen, toggle, icon: Icon }) => {
  return (
    <div className="mb-1">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
      >
        {Icon && <Icon className="mr-3" />}
        <span className="flex-1 text-left">{title}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pl-4 py-2 space-y-2">{children}</div>
      </div>
    </div>
  );
};

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, isSignedIn } = useUser();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore the scroll position when menu closes
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-full w-80 bg-gradient-to-b from-gray-900 to-black text-white transform transition-all duration-500 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
            <p className="font-bold text-xl tracking-tight">
              Explore Maya<span className="text-blue-400">.</span>
            </p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <HiX className="text-2xl text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-4 h-[calc(100%-120px)] overflow-y-auto">
          {/* Auth section moved to top */}
          <div className="mb-6">
            {isSignedIn ? (
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                >
                  <FiLayout className="mr-3" />
                  Dashboard
                </Link>

                {/* Echo with dropdown */}
                <DropdownMenu
                  icon={FiMessageSquare}
                  title="Echo"
                  isOpen={openDropdown === "echo"}
                  toggle={() => toggleDropdown("echo")}
                >
                  <Link
                    to="/echo/messages"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                  >
                    Messages
                  </Link>
                  <Link
                    to="/echo/notifications"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block justify-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/echo/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                  >
                    Settings
                  </Link>
                </DropdownMenu>

                {/* Other main links */}
                <Link
                  to="/nexus"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                >
                  <FiGlobe className="mr-3" />
                  Nexus
                </Link>
                <Link
                  to="/oracle"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
                >
                  <FiDatabase className="mr-3" />
                  Oracle
                </Link>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider">
                  <FiLogIn className="mr-2" />
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Nav items moved below */}
          <nav className="space-y-3 border-t border-gray-800 pt-6">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* User button at bottom */}
          {isSignedIn && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="px-4 py-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-500 border-t border-gray-800">
          © {new Date().getFullYear()} Maya. All rights reserved.
        </div>
      </div>

      {/* Main Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo + Product */}
            <div className="flex items-center gap-7">
              <Link to="/" className="logo-link">
                <img src="/img/the_maya_logo.png" alt="logo" className="w-10" />
              </Link>
              {isSignedIn && (
                <Button
                  id="product-button"
                  title="Products"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {isSignedIn && (
                <>
                  <Link to="/nexus" className="nav-hover-btn">
                    Nexus
                  </Link>
                  <Link to="/oracle" className="nav-hover-btn">
                    Oracle
                  </Link>
                  <Link to="/echo" className="nav-hover-btn">
                    Echo
                  </Link>
                </>
              )}

              {isSignedIn &&
                navItems.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}

              {isSignedIn ? (
                <>
                  <Link to="/dashboard" className="nav-hover-btn">
                    Dashboard
                  </Link>
                  <UserButton />
                </>
              ) : (
                <SignInButton mode="modal">
                  <button className="nav-hover-btn">Sign In</button>
                </SignInButton>
              )}

              {/* Audio Toggle */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-6 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <HiMenu
                className="text-2xl text-white cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;
