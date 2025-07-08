"use client";
import authService from "@/lib/firebase/authService";
import { Icon } from "@/lib/react-icons";
import { redirect } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

const oauthProviders = [
  {
    name: "github",
    label: "Github",
    icon: <Icon name="github" className="w-5 h-5" />,
  },
  {
    name: "google",
    label: "Google",
    icon: <Icon name="google" className="w-5 h-5" />,
  },
];

const action = async (name) => {
  if (name === "github") {
    await authService?.signInWithGitHub();
    redirect("/dashboard");
  }
  if (name === "google") {
    await authService?.signInWithGoogle();
    redirect("/dashboard");
  }
};

const OAuthLogin = () => {
  return (
    <div className="flex gap-5">
      {oauthProviders.map(({ name, label, icon }) => (
        <form
          key={name}
          action={() => {
            action(name);
          }}
        >
          <button
            type="submit"
            className="p-2 px-5 border-2 border-[#333] rounded-lg cursor-pointer flex gap-2 items-center bg-[#222] hover:bg-[#333]"
          >
            {icon}
            {label}
          </button>
        </form>
      ))}
    </div>
  );
};

export default OAuthLogin;
