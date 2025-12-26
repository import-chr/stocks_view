'use client'

import InputField from "@/components/forms/InputField"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import FooterLink from "@/components/forms/FooterLink"

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
            name="email"
            label="Email"
            placeholder="email@host.com"
            type="email"
            register={register}
            error={errors.email}
            validation={{ required: 'Email is required', pattern: { value: /^\w+@\w+\.\w+$/, message: 'Email address is required' } }}
        />

        <InputField 
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 character' } }}
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing In': 'Sign In'}
        </Button>

        <FooterLink text="Don't have an account?" linkText="Sign Up" href="/sign-up"/>
      </form>
    </>
  )
}

export default SignIn