"use client";
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Passwords do not match');
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            const error = await res.json();
            return alert(error.message || 'Something went wrong');
        }

        const resJSON = await res.json();
        console.log(resJSON);
    });

    return (
        <div className='h-[calc(100vh-10rem)] flex items-center justify-center'>
            <form onSubmit={onSubmit} className='w-1/4'>
                <h1 className='text-white text-center p-4 text-2xl font-bold'>Register</h1>

                <Label htmlFor='username'>Username</Label>
                <Input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }
                    })}
                />
                {errors.username && (
                    <span className='text-red-500 text-sm'>
                        {typeof errors.username?.message === 'string' && errors.username.message}
                    </span>
                )}

                <Label htmlFor='email'>Email</Label>
                <Input
                    type="email"
                    placeholder="user@gmail.com"
                    {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is required'
                        }
                    })}
                />
                {errors.email && (
                    <span className='text-red-500 text-sm'>
                        {typeof errors.email?.message === 'string' && errors.email.message}
                    </span>
                )}

                <Label htmlFor='password'>Password</Label>
                <Input
                    type="password"
                    placeholder="********"
                    {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is required'
                        }
                    })}
                />
                {errors.password && (
                    <span className='text-red-500 text-sm'>
                        {typeof errors.password?.message === 'string' && errors.password.message}
                    </span>
                )}

                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                    type="password"
                    placeholder="********"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: 'Confirm Password is required'
                        }
                    })}
                />
                {errors.confirmPassword && (
                    <span className='text-red-500 text-sm'>
                        {typeof errors.confirmPassword?.message === 'string' && errors.confirmPassword.message}
                    </span>
                )}

                <button type="submit" className='p-3 bg-blue-600 w-full text-white rounded mt-2'>
                    Register
                </button>
            </form>
        </div>
    );
}