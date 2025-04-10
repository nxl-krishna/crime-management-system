import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [results] = await db.execute(`SELECT victims.first_name, victims.last_name, crimes.crime_type
                                             FROM victims
                                             JOIN crimes ON victims.crime_id = crimes.crime_id;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching victims and associated crimes:', err);
        return NextResponse.json({ error: 'Failed to retrieve victims and associated crimes' }, { status: 500 });
    }
}
