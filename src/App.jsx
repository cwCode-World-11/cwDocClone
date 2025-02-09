import Login from "./component/Login";
import Signup from "./component/Signup";
import ForgotPassword from "./component/ForgetPassword";
import Home from "./component/Home";
import NotFound from "./component/NotFound";
import DocumentView from "./component/DocumentView";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* App Page */}
      <Route path="/" exact element={<PrivateRoute elementPodu={<Home />} />} />
      <Route
        path="/documentView"
        element={<PrivateRoute elementPodu={<Navigate to={"/"} />} />}
      />
      <Route
        path="/documentView/:id"
        element={<PrivateRoute elementPodu={<DocumentView />} />}
      />

      {/* 404 NOT FOUND */}
      <Route path="*" element={<PrivateRoute elementPodu={<NotFound />} />} />
    </Routes>
  );
}
export default App;
