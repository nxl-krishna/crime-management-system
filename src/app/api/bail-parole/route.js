// src/app/api/bail_parole/route.js
import { db } from "../../../../lib/db";

// Get all bail/parole records with criminal details
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(`
      SELECT bp.id, bp.bail_status, bp.parole_status, bp.bail_amount, bp.release_date,
             c.criminal_id, c.first_name, c.last_name, c.gender, c.date_of_birth, c.nationality
      FROM bail_parole bp
      JOIN criminals c ON bp.criminal_id = c.criminal_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new bail/parole record
export async function POST(req) {
  try {
    const { criminal_id, bail_status, parole_status, bail_amount, release_date } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO bail_parole (criminal_id, bail_status, parole_status, bail_amount, release_date)
       VALUES (?, ?, ?, ?, ?)`,
      [criminal_id, bail_status, parole_status, bail_amount, release_date]
    );
    return new Response(JSON.stringify({ message: "Bail/Parole record added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a bail/parole record
export async function PUT(req) {
  try {
    const { id, bail_status, parole_status, bail_amount, release_date } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE bail_parole SET 
        bail_status = ?, parole_status = ?, bail_amount = ?, release_date = ?
      WHERE id = ?`,
      [bail_status, parole_status, bail_amount, release_date, id]
    );
    return new Response(JSON.stringify({ message: "Bail/Parole record updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a bail/parole record
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM bail_parole WHERE id = ?", [id]);
    return new Response(JSON.stringify({ message: "Bail/Parole record deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
