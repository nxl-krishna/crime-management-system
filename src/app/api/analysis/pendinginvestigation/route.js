import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const [results] = await db.execute(`SELECT * FROM cases WHERE case_status = 'Pending';`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching pending investigations:', err);
        return NextResponse.json({ error: 'Failed to retrieve pending investigations' }, { status: 500 });
    }
}