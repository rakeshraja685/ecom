"use client";

import Header from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/');
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111a22]">
            <div className="layout-container flex h-full grow flex-col">
                <Header />

                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Sign in to TechMart</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-[#324d67] h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Enter your password"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-[#324d67] h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="flex px-4 py-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#1380ec] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
                                >
                                    <span className="truncate">{loading ? 'Signing in...' : 'Sign In'}</span>
                                </button>
                            </div>
                        </form>

                        <p className="text-[#92adc9] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                            Don't have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
