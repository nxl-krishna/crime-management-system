// src/app/api/witnesses/route.js
import { db } from "../../../../lib/db";

// Get all witnesses with crime details
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(`
      SELECT w.witness_id, w.first_name, w.last_name, w.contact_info, w.statement, w.created_at,
             c.crime_id, c.crime_type, c.crime_date, c.crime_location
      FROM witnesses w
      JOIN crimes c ON w.crime_id = c.crime_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new witness record
export async function POST(req) {
  try {
    const { crime_id, first_name, last_name, contact_info, statement } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO witnesses (crime_id, first_name, last_name, contact_info, statement)
       VALUES (?, ?, ?, ?, ?)`,
      [crime_id, first_name, last_name, contact_info, statement]
    );
    return new Response(JSON.stringify({ message: "Witness added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a witness record
export async function PUT(req) {
  try {
    const { witness_id, first_name, last_name, contact_info, statement } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE witnesses SET 
        first_name = ?, last_name = ?, contact_info = ?, statement = ?
      WHERE witness_id = ?`,
      [first_name, last_name, contact_info, statement, witness_id]
    );
    return new Response(JSON.stringify({ message: "Witness record updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a witness record
export async function DELETE(req) {
  try {
    const { witness_id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM witnesses WHERE witness_id = ?", [witness_id]);
    return new Response(JSON.stringify({ message: "Witness record deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
