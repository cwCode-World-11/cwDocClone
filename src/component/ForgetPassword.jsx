import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../firebase/firebaseAuth";
import { gsap } from "gsap";
import "./css/form.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".forgot-form", {
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

    gsap.to(".forgot-form", {
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
      await resetPassword(e.target[0].value);
      alert("Check your mail!!!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="forgot-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" autoFocus />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <div className="links">
          <span>
            Remember your password? <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
