"use client";
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

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toDateString();
    };

    const handleGeneratePDF = () => {
        if (!caseData) {
            alert('No case data found to generate PDF.');
            return;
        }

        const doc = new jsPDF();
        const marginLeft = 10;
        const maxWidth = 190;
        let y = 20;

        doc.setFont("Times", "Normal");
        doc.setFontSize(18);
        doc.text("Case Report", 105, y, null, null, "center");

        y += 10;
        doc.setFontSize(12);

        // Draw outer border
        doc.rect(marginLeft, y, maxWidth - marginLeft * 2, 170);
        y += 10;

        const addBoxedLine = (label, value) => {
            const lineHeight = 8;
            const wrappedText = doc.splitTextToSize(`${label}: ${value}`, maxWidth - 20);
            const boxHeight = wrappedText.length * lineHeight;

            doc.rect(marginLeft, y, maxWidth - marginLeft * 2, boxHeight);
            doc.text(wrappedText, marginLeft + 2, y + 6);
            y += boxHeight;
        };

        addBoxedLine("Case ID", caseData.case_id);
        addBoxedLine("Status", safeText(caseData.case_status));
        addBoxedLine("Investigation Report", safeText(caseData.investigation_report, "Pending"));
        addBoxedLine("Verdict", safeText(caseData.verdict, "Pending"));
        addBoxedLine("Crime Type", safeText(caseData.crime_type));
        addBoxedLine("Crime Description", safeText(caseData.crime_description));
        addBoxedLine("Crime Date", formatDate(caseData.crime_date));
        addBoxedLine("Crime Location", safeText(caseData.crime_location));
        addBoxedLine("Officer Name", `${safeText(caseData.officer_first_name)} ${safeText(caseData.officer_last_name)}`);
        addBoxedLine("Officer Rank", safeText(caseData.officer_rank));
        addBoxedLine("Criminal Name", `${safeText(caseData.criminal_first_name)} ${safeText(caseData.criminal_last_name)}`);
        addBoxedLine("Role", safeText(caseData.criminal_role));
        addBoxedLine("Conviction Status", safeText(caseData.conviction_status));
        addBoxedLine("Sentence", safeText(caseData.sentence));

        doc.save(`case_${caseData.case_id}_report.pdf`);
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
