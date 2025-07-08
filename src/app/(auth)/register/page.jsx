import CredentialAuthForm from "@/components/CredentialAuthForm";

export const metadata = {
  title: "Register",
  description: "Auth services using next auth, Github and Google providers",
};
const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <CredentialAuthForm type="register" />
    </div>
  );
};

export default Register;
