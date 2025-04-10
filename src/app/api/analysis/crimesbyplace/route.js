import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const [results] = await db.execute(`SELECT state, COUNT(*) AS crime_count
                                             FROM crimes
                                             GROUP BY state
                                             ORDER BY crime_count DESC;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching crimes by state:', err);
        return NextResponse.json({ error: 'Failed to retrieve crimes by state' }, { status: 500 });
    }
}
//state wise count 
