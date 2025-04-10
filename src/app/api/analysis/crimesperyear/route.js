import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const [results] = await db.execute(`SELECT YEAR(crime_date) AS year, COUNT(*) AS count FROM crimes GROUP BY year;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching crimes per year:', err);
        return NextResponse.json({ error: 'Failed to retrieve crimes per year' }, { status: 500 });
    }
}
