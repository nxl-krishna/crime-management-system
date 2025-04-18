import { db } from '../../../../../lib/db'; // Make sure to adjust this based on your db setup

export async function GET(req) {
    try {
        const [rows] = await db.query('SELECT total_officers FROM officer_count');

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ total_officers: rows[0].total_officers }), {
            status: 200,
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
