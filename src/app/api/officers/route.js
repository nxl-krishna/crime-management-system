// src/app/api/officers/route.js
import { db } from "../../../../lib/db";

// Get all officers
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM officers");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new officer
export async function POST(req) {
  try {
    const { first_name, last_name, ranks, station, phone_number, email } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO officers (first_name, last_name, ranks, station, phone_number, email) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, ranks, station, phone_number, email]
    );
    return new Response(JSON.stringify({ message: "Officer added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update an officer's details
export async function PUT(req) {
  try {
    const { officer_id, first_name, last_name, ranks, station, phone_number, email } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE officers SET 
        first_name = ?, last_name = ?, ranks = ?, station = ?, phone_number = ?, email = ?
      WHERE officer_id = ?`,
      [first_name, last_name, ranks, station, phone_number, email, officer_id]
    );
    return new Response(JSON.stringify({ message: "Officer updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete an officer
export async function DELETE(req) {
  try {
    const { officer_id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM officers WHERE officer_id = ?", [officer_id]);
    return new Response(JSON.stringify({ message: "Officer deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
