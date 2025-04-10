import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [results] = await db.execute(`SELECT crimes.crime_type, evidence.evidence_type, evidence.description
                                             FROM evidence
                                             JOIN crimes ON evidence.crime_id = crimes.crime_id;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching evidence linked to crimes:', err);
        return NextResponse.json({ error: 'Failed to retrieve evidence linked to crimes' }, { status: 500 });
    }
}