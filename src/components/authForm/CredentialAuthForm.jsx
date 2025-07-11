"use client";

import { useActionState, useEffect } from "react";
import TextInput from "../formComponents/TextInput";
import { credentialLogin, credentialRegister } from "@/actions/authActions";
import { Icon } from "@/lib/react-icons";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

const CredentialAuthForm = ({ type }) => {
  const [state, formAction] = useActionState(
    type === "register" ? credentialRegister : credentialLogin,
    {
      success: null,
      message: "",
      errors: null,
    }
  );

  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      // Optional: Show success toast
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="w-full py-6 px-6 rounded-xl flex flex-col gap-4 justify-center"
    >
      {type === "register" && (
        <TextInput
          label="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="border-[#444] bg-[#333]"
          error={state?.errors?.name}
          icon={<Icon name="user" className="w-6 h-6 text-[#aaa]" />}
        />
      )}
      <TextInput
        label="email"
        name="email"
        type="email"
        placeholder="username@domain.com"
        className="border-[#444] bg-[#333]"
        error={state?.errors?.email}
        icon={<Icon name="email" className="w-6 h-6 text-[#aaa]" />}
      />
      <TextInput
        label="password"
        name="password"
        type="password"
        placeholder="••••••••"
        className="border-[#444] bg-[#333]"
        error={state?.errors?.password}
        icon={<Icon name="password" className="w-6 h-6 text-[#aaa]" />}
      />
      {state?.errors?.other && (
        <span className="w-full text-center text-sm text-red-500">
          {state?.errors?.other}
        </span>
      )}
      <SubmitButton label={type} />
    </form>
  );
};

export default CredentialAuthForm;
