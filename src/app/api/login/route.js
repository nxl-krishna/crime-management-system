import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../../../lib/db';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const connection = await db.getConnection();

        // Fetch user from the database
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        connection.release();

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return new Response(
            JSON.stringify({ message: 'Login successful', token }),
            { status: 200 }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Login failed', details: err.message }),
            { status: 500 }
        );
    }
}
