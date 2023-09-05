import { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  //Add event listener to hide/show the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    //clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button
        className={`fixed right-7 p-2 bottom-[70px] bg-tertiary-medium rounded-full drop-shadow-xl ${
          isVisible
            ? "visible  translate-y-0 opacity-100 transition-all "
            : "invisible translate-y-5 opacity-0 transition-all"
        } `}
        onClick={scrollToTop}
      >
        {" "}
        <MdArrowUpward />{" "}
      </button>
    </div>
  );
}
