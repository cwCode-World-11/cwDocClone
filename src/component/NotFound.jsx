import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const NotFound = () => {
  useEffect(() => {
    // GSAP animation for fading and scaling the text
    gsap.fromTo(
      ".main-title",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="bg-gray-900 w-screen h-screen flex items-center flex-col justify-center">
      <h1 className="main-title text-[5em] font-bold text-gray-500">404</h1>
      <h2 className="description text-[4em] font-bold text-gray-300">
        Page not found
      </h2>
      <Link className="font-bold text-gray-300" to="/">
        Go back to home page
      </Link>
    </main>
  );
};

export default NotFound;
