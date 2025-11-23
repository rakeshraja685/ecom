"use client";
import { useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push('/');
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="glass p-8 rounded-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Create Account</h2>
                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">Register</button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
