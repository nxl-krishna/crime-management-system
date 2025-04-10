import bcrypt from 'bcrypt';
import { db } from '../../../../lib/db';

export async function POST(req) {
    try {
        const { username, password, role } = await req.json();
        console.log("Received data:", { username, password, role });

        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await db.getConnection();
        await connection.execute(
            'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );
        connection.release();

        console.log("User created successfully");
        return new Response(JSON.stringify({ message: "Signup successful" }), { status: 201 });
    } catch (err) {
        console.error("Error in signup API:", err.message);
        return new Response(JSON.stringify({ message: "Signup failed", error: err.message }), { status: 500 });
    }
}
