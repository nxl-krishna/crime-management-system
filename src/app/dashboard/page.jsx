"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AnalysisPage from "../../component/Analysis";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, []);

    const navigate = (path) => {
        router.push(path);
    };

    return (
        <>
            <div className="flex flex-col items-center  min-h-20vh bg-gray-100">
                
                <nav className="w-full bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl text-white font-bold">Crime Management System</h1>
                        <div className="space-x-4">
                            {[
                               
                              
                                { name: "Criminals", path: "/dashboard/criminal-crime/criminals" },
                                { name: "Crimes", path: "/dashboard/criminal-crime/crime" },
                                { name: "Cases", path: "/dashboard/cases" },
                                { name: "Criminal-Crime", path: "/dashboard/criminal-crime" },
                                { name: "Officers", path: "/dashboard/officer" },
                                { name: "Evidence", path: "/dashboard/evidence" },
                                { name: "Bail-Parole", path: "/dashboard/bailparol" },
                                { name: "Victims", path: "/dashboard/victims" },
                                { name: "Witnesses", path: "/dashboard/witnesses" },
                               
                                { name: "Analysis", path: "/analysis" },
                                { name: "Logout", path: "/auth/login" }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
                
            </div>
            <AnalysisPage/>
        </>
    );
}
