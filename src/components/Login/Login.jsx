import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex justify-center mt-12 space-x-4 text-white">
      {!user?.email && (
        <button
          aria-label="Log in with Google"
          className="p-2  bg-red-500 rounded-lg font-semibold"
          onClick={() => loginWithRedirect()}
        >
          Apply with Linkedin
        </button>
      )}
    </div>
  );
};

export default Login;
