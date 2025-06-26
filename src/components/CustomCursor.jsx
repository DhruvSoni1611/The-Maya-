"use client";
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = ({ type = "dot-ring" }) => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    // Add custom cursor class to body
    document.body.classList.add("custom-cursor");
    document.body.classList.add(`cursor-${type}`);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Mouse down handler
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    // Mouse up handler
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      // Smooth movement for cursor dot/blob
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;

      // Slower movement for ring (if dot-ring type)
      if (type === "dot-ring") {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
      }

      // Update cursor position
      if (cursorRef.current) {
        if (type === "dot-ring") {
          cursorRef.current.style.left = `${cursorX}px`;
          cursorRef.current.style.top = `${cursorY}px`;
        } else {
          // For liquid cursor, add slight delay for organic feel
          cursorRef.current.style.left = `${cursorX}px`;
          cursorRef.current.style.top = `${cursorY}px`;
        }
      }

      // Update ring position (for dot-ring type)
      if (cursorRingRef.current && type === "dot-ring") {
        cursorRingRef.current.style.left = `${ringX}px`;
        cursorRingRef.current.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    // Handle hover states for interactive elements
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Handle text selection areas
    const handleTextHover = () => {
      setIsText(true);
    };

    const handleTextLeave = () => {
      setIsText(false);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-hover'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    // Add text hover listeners
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, div[contenteditable], .cursor-text"
    );

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleTextHover);
      el.addEventListener("mouseleave", handleTextLeave);
    });

    // Start animation loop
    animateCursor();

    // Cleanup
    return () => {
      document.body.classList.remove("custom-cursor");
      document.body.classList.remove(`cursor-${type}`);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });

      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleTextHover);
        el.removeEventListener("mouseleave", handleTextLeave);
      });
    };
  }, [type, isVisible]);

  // Don't render on mobile devices
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {type === "dot-ring" ? (
        <>
          {/* Cursor Dot */}
          <div
            ref={cursorRef}
            className={`cursor-dot ${isVisible ? "opacity-100" : "opacity-0"} ${
              isHovering ? "hover" : ""
            } ${isClicking ? "click" : ""} ${isText ? "text" : ""}`}
            style={{
              position: "fixed",
              pointerEvents: "none",
              zIndex: 9999,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Cursor Ring */}
          <div
            ref={cursorRingRef}
            className={`cursor-ring ${
              isVisible ? "opacity-100" : "opacity-0"
            } ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""} ${
              isText ? "text" : ""
            }`}
            style={{
              position: "fixed",
              pointerEvents: "none",
              zIndex: 9998,
              transition: "opacity 0.3s ease",
            }}
          />
        </>
      ) : (
        /* Liquid Cursor */
        <div
          ref={cursorRef}
          className={`cursor-blob ${isVisible ? "opacity-100" : "opacity-0"} ${
            isHovering ? "hover" : ""
          } ${isClicking ? "click" : ""} ${isText ? "text" : ""}`}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
