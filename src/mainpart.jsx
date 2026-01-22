import React, { useState } from "react";
import Login from "./components/login.jsx";
// import App from "./App.jsx"

const Login = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // start with login open
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (data) => {
    console.log("Login data:", data);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!isLoggedIn && (
        <LoginDialog
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      )}

      {isLoggedIn && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Welcome to Contact Manager</h1>

          {/* Slide toggle Sign In / Sign Out button */}
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center h-12 rounded-full w-40 bg-gray-200 p-1"
          >
            <span className="absolute left-1 w-1/2 h-full bg-purple-600 rounded-full transition-all"></span>
            <span className="z-10 text-white font-semibold w-full text-center">
              Sign Out
            </span>
          </button>
        </div>
      )}
      {/* <App /> */}
    </div>
  
  );
};

export default Login;
