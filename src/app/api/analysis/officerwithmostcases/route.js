// Next.js API Route - Officer with Most Cases

import { db } from "../../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [results] = await db.execute(`SELECT officers.first_name, officers.last_name, COUNT(cases.case_id) AS case_count
                                             FROM officers
                                             JOIN cases ON officers.officer_id = cases.officer_id
                                             GROUP BY officers.officer_id
                                             ORDER BY case_count DESC
                                             LIMIT 1;`);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching officer with most cases:', err);
        return NextResponse.json({ error: 'Failed to retrieve officer with most cases' }, { status: 500 });
    }
}
