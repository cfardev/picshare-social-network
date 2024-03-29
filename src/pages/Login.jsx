import React from "react";
import logo from "../assets/logo.svg";
import illustration from "../assets/ilustration.svg";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { BsGithub } from "react-icons/bs";
const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response?.profileObj));
    const { givenName, googleId, imageUrl } = response?.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: givenName,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center container mx-auto h-screen p-10">
      <main className="flex flex-col-reverse md:flex-row items-center">
        <div className="flex flex-col gap-8 items-start p-10">
          <img src={logo} alt="PicShare Logo" className="w-48" />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                className="bg-gray-200 flex justify-center items-center p-3 rounded-lg 
              cursor-pointer outline-none gap-4 shadow-xl text-sm md:text-md font-bold"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type="button"
              >
                <FcGoogle className="w-8 h-8" /> Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
        <div>
          <img
            src={illustration}
            alt="Undraw Illustration"
            className="w-full max-w-[600px]"
          />
        </div>
      </main>
      <footer className="w-screen bottom-0 flex items-center justify-center mt-10">
        <p className="font-black text-xl flex gap-1.5">
          Made by
          <a
            className="text-red-600 flex items-center gap-1"
            href="https://github.com/FabriDevelop"
            rel="noreferrer"
            target={"_blank"}
          >
            Carlos Arcia <BsGithub />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
