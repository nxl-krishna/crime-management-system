import { db } from "../../../../../lib/db";

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const [rows] = await db.query(
            `
            SELECT 
                c.case_id, 
                c.case_status, 
                c.investigation_report, 
                c.verdict,
                cr.crime_type, 
                cr.description AS crime_description, 
                cr.crime_date, 
                cr.crime_location,
                o.first_name AS officer_first_name, 
                o.last_name AS officer_last_name, 
                o.ranks AS officer_rank,
                cl.first_name AS criminal_first_name, 
                cl.last_name AS criminal_last_name,
                cc.role AS criminal_role, 
                cc.conviction_status, 
                cc.sentence_details AS sentence
            FROM cases c
            LEFT JOIN crimes cr ON c.crime_id = cr.crime_id
            LEFT JOIN officers o ON c.officer_id = o.officer_id
            LEFT JOIN criminal_crime cc ON cc.crime_id = cr.crime_id
            LEFT JOIN criminals cl ON cc.criminal_id = cl.criminal_id
            WHERE c.case_id = ?;
            `,
            [id]
        );

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ error: "Case not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(rows[0]), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
