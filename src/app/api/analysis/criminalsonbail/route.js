import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [results] = await db.execute(`SELECT * FROM bail_parole WHERE bail_status = 'Granted';`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching criminals on bail:', err);
        return NextResponse.json({ error: 'Failed to retrieve criminals on bail' }, { status: 500 });
    }
}
