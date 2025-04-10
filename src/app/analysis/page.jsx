"use client"
import { useState, useEffect } from 'react';

const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`/api/analysis/${endpoint}`);
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        return [];
    }
};

export default function AnalysisPage() {
    const [data, setData] = useState({});

    useEffect(() => {
        const endpoints = [
            'common-crime',
            'officerwithmostcases',
            'crimesbyplace',
            'criminalsonbail',
            'victimsandassociatedcrimes',
            'evidencelinkedtothecrime',
            'pendinginvestigation',
            'baildeniedcases',
            'genderwisecriminals',
            'crimesperyear'
        ];

        Promise.all(endpoints.map(endpoint =>
            fetchData(endpoint).then(result => ({ [endpoint]: result }))
        )).then(results => {
            const combined = results.reduce((acc, item) => ({ ...acc, ...item }), {});
            setData(combined);
        });
    }, []);

    return (
        <div className="p-5 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Criminal Management System Analysis</h1>
            {Object.keys(data).map((key) => (
                <div key={key} className="bg-black-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">{key.replace(/-/g, ' ').toUpperCase()}</h2>
                    <table className="w-full bg-brown-300 rounded">
                        <thead>
                            <tr>
                                {data[key].length > 0 && Object.keys(data[key][0]).map((col) => (
                                    <th key={col} className="p-2 text-left bg-indigo-600">{col.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data[key].map((item, index) => (
                                <tr key={index} className="border-b border-indigo-600">
                                    {Object.values(item).map((val, idx) => (
                                        <td key={idx} className="p-2">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
