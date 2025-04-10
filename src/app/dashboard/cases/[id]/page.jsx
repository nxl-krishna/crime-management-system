"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

export default function CaseStudyPage() {
    const [caseId, setCaseId] = useState('');
    const [caseData, setCaseData] = useState(null);

    const fetchCaseData = async (id) => {
        try {
            const response = await fetch(`/api/cases/${id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching case data: ${response.statusText}`);
            }
            const data = await response.json();
            setCaseData(data);
        } catch (error) {
            console.error('Error fetching case data:', error);
        }
    };

    const safeText = (text, fallback = 'N/A') => text || fallback;

    const handleGeneratePDF = () => {
        if (!caseData) {
            alert('No case data found to generate PDF.');
            return;
        }
        const doc = new jsPDF();
        doc.text(`Case ID: ${caseData.case_id}`, 10, 10);
        doc.text(`Status: ${caseData.case_status}`, 10, 20);
        doc.text(`Investigation Report: ${caseData.investigation_report || 'Pending'}`, 10, 30);
        doc.text(`Verdict: ${caseData.verdict || 'Pending'}`, 10, 40);
        doc.text(`Crime Type: ${safeText(caseData.crime_type)}`, 10, 50);
        doc.text(`Crime Description: ${safeText(caseData.crime_description)}`, 10, 60);
        doc.text(`Crime Date: ${safeText(caseData.crime_date)}`, 10, 70);
        doc.text(`Crime Location: ${safeText(caseData.crime_location)}`, 10, 80);
        doc.text(`Officer Name: ${safeText(caseData.officer_first_name)} ${safeText(caseData.officer_last_name)}`, 10, 90);
        doc.text(`Officer Rank: ${safeText(caseData.ranks)}`, 10, 100);
        doc.text(`Criminal Name: ${safeText(caseData.criminal_first_name)} ${safeText(caseData.criminal_last_name)}`, 10, 110);
        doc.text(`Role: ${safeText(caseData.role)}`, 10, 120);
        doc.text(`Conviction Status: ${safeText(caseData.conviction_status)}`, 10, 130);
        doc.text(`Sentence: ${caseData.sentence_details || 'N/A'}`, 10, 140);
        doc.save(`case_${caseData.case_id}.pdf`);
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold">Case Study PDF Generator</h1>
            <input
                type="text"
                placeholder="Enter Case ID"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="mt-4 p-2 border rounded"
            />
            <button
                className="ml-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => fetchCaseData(caseId)}
            >
                Fetch Case Data
            </button>
            {caseData && (
                <div className="mt-4">
                    <p>Case ID: {caseData.case_id}</p>
                    <p>Status: {caseData.case_status}</p>
                    <p>Investigation Report: {caseData.investigation_report || 'Pending'}</p>
                    <p>Verdict: {caseData.verdict || 'Pending'}</p>
                    <button
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                        onClick={handleGeneratePDF}
                    >
                        Generate PDF
                    </button>
                </div>
            )}
        </div>
    );
}