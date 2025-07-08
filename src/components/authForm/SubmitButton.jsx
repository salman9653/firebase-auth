"use client";
import { useFormStatus } from "react-dom";
import Button from "../formComponents/Button";

export default function SubmitButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <Button version="primary" className="mt-4" type="submit" disabled={pending}>
      {pending ? "Plesase Wait" : label}
    </Button>
  );
}
