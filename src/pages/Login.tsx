import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import STTButton from "../components/STTButton";
import STTInput from "../components/STTInput/STTInput";
import type { AuthCredentials } from "../types/Auth.ts";

function Login() {
  const [loginForm, setLoginForm] = useState<AuthCredentials>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const {
    login,
    // isLoggingIn,
    loginError,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginForm, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url(/bg.png)] bg-cover bg-no-repeat bg-center">
      <img
        src="/logo.svg"
        alt="Logo"
        className="absolute w-[236px] h-[48px] top-[32px] left-[32px]"
      />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl leading-[2rem] font-semibold mb-4 text-[#1A2C5A]">
          Login to your account
        </h2>
        {loginError && (
          <p className="color-error mb-4">
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              loginError.response.data.message
            }
          </p>
        )}
        <form action="submit" onSubmit={handleSubmit}>
          <div className="mb-4">
            <STTInput
              label="Username"
              type="text"
              value={loginForm.username}
              onChange={(value: string) =>
                setLoginForm({ ...loginForm, username: value })
              }
            />
          </div>
          <STTInput
            label="Password"
            type="password"
            value={loginForm.password}
            onChange={(value: string) =>
              setLoginForm({ ...loginForm, password: value })
            }
            showToggle
          />
          <STTButton variant="link" className="!px-3 !py-0.5 mt-10 mb-8">
            Forgot password?
          </STTButton>
          <span className="flex flex-col gap-y-[24px]">
            <STTButton type="submit" fullWidth>
              Sign In
            </STTButton>
            <span className="flex items-center justify-center gap-x-2">
              <div className="border-t border-gray-300 w-full" />
              <p>or</p>
              <div className="border-t border-gray-300 w-full" />
            </span>
            <STTButton fullWidth variant="secondary">
              Continue with SSO
            </STTButton>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
