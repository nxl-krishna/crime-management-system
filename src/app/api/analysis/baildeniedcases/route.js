import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const [results] = await db.execute(`SELECT * FROM bail_parole WHERE bail_status = 'Denied';`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching bail denied cases:', err);
        return NextResponse.json({ error: 'Failed to retrieve bail denied cases' }, { status: 500 });
    }
}