"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Evita la redirección automática para manejar errores
    });

    if (res?.error) {
        setErrorMessage(res.error);
    } else {
        router.push("/dashboard"); // Redirige a una página después del login
    }
});

  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <form onSubmit={onSubmit}  className='w-96 p-8 rounded-lg text-white flex flex-col border border-black shadow-md bg-gradient-to-r from-gray-900 from-10% via-neutral-800 via-30% via-zinc-900 via-60% to-stone-900 to-90% hover:border-rose-500 hover:scale-105 transition-all'>

        <div className="flex justify-center space-x-4 mb-8">
            <a href="/auth/register" className="p-4 text-xl font-bold text-center text-slate-700 hover:text-white hover:border-b-2 hover:border-rose-500 transition-all">Sign in</a>
            <a href="/auth/login " className="p-4 text-xl font-bold text-center border-b-2 border-rose-500">Sign up</a>
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <Label htmlFor="email">Email</Label>
        
        <Input
          type="email"
          placeholder="user@gmail.com"
          {...register("email", { required: "Email is required" })}
        />

        {errors.email && (
          <span className='text-red-500 text-sm'>
            {typeof errors.email.message == 'string' && errors.email.message}
          </span>
        )}


        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="********"
          {...register("password", { required: "Password is required" })}
        />

        {errors.password && (
          <span className='text-red-500 text-sm'>
            {typeof errors.password.message == 'string' && errors.password.message}
          </span>
        )}

        <a href="/auth/forgot-password" className="text-slate-500 mb-2 block text-sm hover:text-rose-500 transition-all mt-2">Forgot password?</a>

        <Button type="submit">Iniciar sesión</Button>
      </form>
    </div>
  );
}