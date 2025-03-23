"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Evita la redirección automática para manejar errores
    });

    if (result?.error) {
      setErrorMessage("Correo o contraseña incorrectos");
    } else {
      router.push("/dashboard"); // Redirige a una página después del login
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h1 className="text-white text-center p-4 text-2xl font-bold">Login</h1>

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


        <Button type="submit">Iniciar sesión</Button>
      </form>
    </div>
  );
}
