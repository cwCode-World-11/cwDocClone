import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { logIn } from "../firebase/firebaseAuth";
import "./css/form.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".login-form", {
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

    gsap.to(".login-form", {
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
      if (!email) {
        alert("Please enter valid email");
        return;
      }
      const l = await logIn(email, password);
      if (l) {
        navigate("/");
      }
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  }

  return (
    <main className="container">
      <div className="login-form">
        <h2>Login</h2>
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>
        <div className="links" style={{ textAlign: "center" }}>
          <a href="/forgotPassword">Forgot Password?</a>
        </div>
        <div className="links">
          <span>
            Don't have an account? <a href="/signup">Sign Up</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
