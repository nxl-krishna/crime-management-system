import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';



export async function GET() {
    try {
        const [results] = await db.execute(`SELECT gender, COUNT(*) AS count FROM criminals GROUP BY gender;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching gender distribution of criminals:', err);
        return NextResponse.json({ error: 'Failed to retrieve gender distribution' }, { status: 500 });
    }
}

