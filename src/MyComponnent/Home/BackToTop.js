import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./BackToTop.css";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = (scrollTop / docHeight) * 100;

      setScrollPercent(percent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`water-back-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop}>
      <div className="water-fill-wrapper">
        <div className="water-fill-bg" style={{ top: `${100 - scrollPercent}%` }}>
          <div className="wave"></div>
          <div className="wave wave2"></div>
        </div>
        <div className="back-arrow"><FaArrowUp /></div>
      </div>
    </div>
  );
};

export default BackToTop;
