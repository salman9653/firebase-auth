import { Icon } from "@/lib/react-icons";
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

const OAuthLogin = () => {
  return (
    <div className="flex gap-5">
      {oauthProviders.map(({ name, label, icon }) => (
        <form
          key={name}
          // action={async () => {
          // "use server";
          // await signIn(name, { redirectTo: "/" });
          // }}
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
