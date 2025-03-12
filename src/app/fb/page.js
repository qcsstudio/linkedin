"use client";

export default function FacebookLoginButton() {
  const handleLogin = () => {
    window.location.href = "/api/auth/facebook";
  };

  return (
    <button 
      onClick={handleLogin} 
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
    >
      Login with Facebook
    </button>
  );
}
