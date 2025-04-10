import { db } from "../../../../../lib/db";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const [rows] = await db.query(
            `
           SELECT case_id, case_status, investigation_report, verdict
FROM cases
WHERE case_id = ?;

            `,
            [id]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "Case not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(rows[0]), { status: 200 });
    } catch (error) {
        console.error("Database error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
