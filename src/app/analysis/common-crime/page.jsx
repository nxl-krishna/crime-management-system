// Criminal Management System Frontend using Next.js and Chart.js

"use client";

import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register chart components
ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

// Frontend Page Component
export default function CrimeChart() {
    const [crimeData, setCrimeData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/analysis/common-crime');
                const data = await response.json();
                setCrimeData(data);

                if (chartRef.current) {
                    const ctx = chartRef.current.getContext('2d');

                    // Destroy existing chart instance to prevent duplication
                    if (chartRef.current && chartRef.current.chartInstance) {
                        chartRef.current.chartInstance.destroy();
                    }

                    // Create a new chart instance
                    chartRef.current.chartInstance = new ChartJS(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.map(item => item.crime_type),
                            datasets: [{
                                label: 'Number of Crimes',
                                data: data.map(item => item.count),
                                backgroundColor: 'rgba(255, 182, 193, 0.5)',
                                borderColor: 'rgba(255, 182, 193, 1)',
                                borderWidth: 1
                            }],
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Most Common Crimes'
                                }
                            }
                        }
                    });
                }
            } catch (err) {
                console.error('Error fetching crime data:', err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Crime Statistics</h1>
            <canvas ref={chartRef} id="crimeChart" width="300" height="150"></canvas>
        </div>
    );
}
