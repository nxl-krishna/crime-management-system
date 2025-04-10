import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';
// API Route: Get most common crime types
export async function GET() {
    try {
        const [rows] = await db.query(
            `SELECT crime_type, COUNT(*) as count FROM crimes GROUP BY crime_type ORDER BY count DESC;`
        );
        return NextResponse.json(rows);
    } catch (err) {
        console.error('Error retrieving crime data:', err);
        return NextResponse.json({ error: 'Error retrieving crime data' }, { status: 500 });
    }
}

