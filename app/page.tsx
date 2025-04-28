/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "components/ui/button";

// import Button from "@ui/button";
import { Input } from "antd";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Loader } from "lucide-react";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });

  const Router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const onUsernameChange = (e: any) => {
    setCredentials((prev: any) => ({
      ...prev,
      username: e?.target?.value,
    }));
  };

  const onPasswordChange = (e: any) => {
    setCredentials((prev: any) => ({
      ...prev,
      password: e?.target?.value,
    }));
  };

  const onLoginClick = () => {
    setError("");
    if (!credentials?.username || !credentials?.password) {
      // notification.error({ message: "Invalid Credentials!!" });
      setError("Enter Username & Password");
    } else if (
      credentials?.username === "admin@nectar" &&
      credentials?.password === "Admin@123"
    ) {
      setLocalLoading(true);
      setTimeout(() => {
        Router.push("/list");
      }, 1000);
    } else {
      setLocalLoading(true);
      setTimeout(() => {
        setError("Invalid Username or password");
        setLocalLoading(false);
      }, 1000);
    }
  };

  const getBg = () => "bg-[url('/clients/bloom-bg.jpeg')]";

  return (
    <div
      className={`min-h-screen ${getBg()} bg-cover bg-gray-200 bg-blend-multiply flex justify-center items-center`}
    >
      <div className="py-12 px-12 bg-gray-400 rounded-2xl shadow-xl">
        <div>
          <div className="text-center text-sm mb-8 mx-auto font-semibold text-secondary tracking-wide cursor-pointer">
            <span>{"Extracting Sweetness of Things"}</span>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder={"Username"}
            className="text-sm"
            onChange={onUsernameChange}
            size="large"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onLoginClick();
              }
            }}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={"Password"}
            className="text-sm"
            onChange={onPasswordChange}
            addonAfter={
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye className="text-primary" size={16} />
                )}
              </span>
            }
            size="large"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onLoginClick();
              }
            }}
          />
        </div>
        {error ? (
          <div>
            <span className="text-red-600">{error}</span>
          </div>
        ) : null}
        <div className="text-center mt-6">
          <Button
            className="py-3 w-full text-sm text-primary-alt bg-black hover:bg-lime-950 text-white rounded-lg"
            onClick={onLoginClick}
            // loading={localLoading}
            // loadingText={"Loading..."}
          >
            {localLoading ? (
              <div className="flex space-x-2 justify-center items-center">
                <Loader className="animate-spin" />
                <span> {"Loagging In..."}</span>{" "}
              </div>
            ) : (
              "Login"
            )}
          </Button>
          {/* <p className="mt-4 text-sm text-secondary">
            {"Forgot Password"}{" "}
            <Link href={"/"} className="text-primary text-sm">
              <span className="underline cursor-pointer">Click Here</span>
            </Link>
          </p> */}
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 p-10 text-center">
        <span className="text-sm opacity-50 text-light">{`v0.1`}</span>
      </div>
    </div>
  );
};
const provider = () => {
  return <Login />;
};

export default provider;
