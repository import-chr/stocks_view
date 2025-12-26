'use server'

import { auth } from "@/lib/better-auth/auth"
import { inngest } from "@/lib/inngest/client"
import { headers } from "next/headers"

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
  try {
    if (!email || !password || !fullName) {
      return { success: false, message: "Please fill in all required fields" }
    }

    const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } });

    if(response?.user) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        }
      })

      return { success: true, data: response }
    }

    return { success: false, message: "Failed to create user account" }
  } catch (error) {
    console.error("Sign up failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    if (error instanceof Error && error.message.includes('email')) {
      return { success: false, message: "This email is already registered" }
    }
    
    return { success: false, message: "Unable to create account. Please try again." }
  }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    if (!email || !password) {
      return { success: false, message: "Please provide email and password" }
    }

    const response = await auth.api.signInEmail({ body: { email, password } });

    if(response?.user) {
      return { success: true, data: response }
    }

    return { success: false, message: "Invalid credentials" }
  } catch (error) {
    console.error("Sign in failed:", { 
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return { success: false, message: "Unable to sign in. Please check your credentials." }
  }
}

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() })

    return { success: true }
  } catch (error) {
    console.error("Sign out failed:", { 
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return { success: false, message: "Sign out failed" }
  }
}
