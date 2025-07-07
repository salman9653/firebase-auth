import CredentialAuthForm from "@/components/CredentialAuthForm";
import OAuthLogin from "@/components/OAuthLogin";

export const metadata = {
  title: "Auth Services | Login",
  description: "Auth services using next auth, Github and Google providers",
};

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <CredentialAuthForm type="login" />
    </div>
  );
};

export default Login;
