"use server";

import { userLoginSchema, userRegisterSchema } from "@/schemas/zodSchema";
import { ZodError } from "zod";
import authService from "../lib/firebase/authService";
import { redirect } from 'next/navigation'
import { auth } from "@/lib/firebase/firebaseConfig";


export async function logout() {
    // await signOut({ redirectTo: "/login" });
}

export async function credentialLogin(prevState, formData) {
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        userLoginSchema.parse({ email, password });
        await authService.credentialLogin({ email, password })
        return {
            success: true,
            message: "login successful",
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErrors = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            return {
                message: "validation failed",
                errors: fieldErrors
            }
        } else {
            return {
                success: false,
                message: 'registration failed', errors: { other: error.message }
            }
        }
    }
}

export async function credentialRegister(prevState, formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        userRegisterSchema.parse({ name, email, password });
        await authService.createAccount({ name, email, password })

        return {
            success: true,
            message: "registration successful",
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErrors = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            return {
                success: false,
                message: "validation failed",
                errors: fieldErrors
            }
        } else {
            return {
                success: false,
                message: 'registration failed', errors: { other: error.message }
            }
        }
    }
}
