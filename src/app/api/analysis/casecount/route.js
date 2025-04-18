import { db } from '../../../../../lib/db'; // Make sure to adjust this based on your db setup

export async function GET(req) {
    try {
        const [rows] = await db.query('SELECT total_cases FROM case_count LIMIT 1');

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
        }

        // Sending the total_cases as the response
        return new Response(JSON.stringify({ total_cases: rows[0].total_cases }), {
            status: 200,
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
