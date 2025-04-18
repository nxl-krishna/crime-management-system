"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnalysisPage from "../../component/Analysis";

export default function Dashboard() {
    const router = useRouter();
    const [totalCases, setTotalCases] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, []);

    const navigate = (path) => {
        router.push(path);
    };

    useEffect(() => {
        const fetchTotalCases = async () => {
            try {
                const response = await fetch("/api/analysis/casecount");
                if (response.ok) {
                    const data = await response.json();
                    setTotalCases(data.total_cases);
                } else {
                    console.error("Failed to fetch total cases");
                }
            } catch (error) {
                console.error("Error fetching total cases:", error);
            }
        };

        fetchTotalCases();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <>
            <div className="flex flex-col items-center min-h-20vh bg-gray-100">
                <nav className="w-full bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl text-white font-bold">Crime Management System</h1>
                        <div className="space-x-4">
                            {[
                                { name: "Case report", path: "/dashboard/cases/pdf" },
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

                {/* Displaying the total cases */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Total Cases: {totalCases !== null ? totalCases : "Loading..."}</h2>
                </div>
            </div>

            <AnalysisPage />
        </>
    );
}
