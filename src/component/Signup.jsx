import { useEffect, useRef } from "react";
import { signUp } from "../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./css/form.css";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".signup-form", {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "ease.out",
    });
    gsap.from(".input-group", {
      opacity: 0,
      x: -60,
      duration: 1,
      delay: 0.3,
      ease: "ease.out",
    });

    gsap.to(".signup-form", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "ease.out",
    });
    gsap.to(".input-group", {
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.3,
      ease: "ease.out",
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      if (!email) {
        alert("Please enter valid email");
        return;
      }
      if (password !== confirmPassword) {
        alert("Please make sure both password and confirm password matches");
        return;
      }
      const s = await signUp(email, password);
      if (s) {
        alert("Congratulation!!!, You successfully created an account.");
        navigate("/");
      }
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  }

  return (
    <div className="container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" ref={emailRef} placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Create a password"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <div className="links">
          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
