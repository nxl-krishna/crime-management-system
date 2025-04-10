"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, role }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }
    
            alert(data.message);  // Display the success message from the response
            router.push("/auth/login");
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-3 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-3 border rounded"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 mb-3 border rounded"
                    >
                        <option value="Investigator">Investigator</option>
                        <option value="Admin">Admin</option>
                        <option value="Officer">Officer</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
