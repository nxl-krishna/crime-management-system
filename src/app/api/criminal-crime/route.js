// src/app/api/criminal-crime/route.js
import { db } from "../../../../lib/db";

// Get all criminal-crime records with joined details
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(`
      SELECT cc.id, c.crime_type, c.description, c.crime_date, c.crime_location, 
             cr.first_name, cr.last_name, cc.role, cc.conviction_status, cc.sentence_details
      FROM criminal_crime cc
      JOIN criminals cr ON cc.criminal_id = cr.criminal_id
      JOIN crimes c ON cc.crime_id = c.crime_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new criminal-crime relationship
export async function POST(req) {
  try {
    const { criminal_id, crime_id, role, conviction_status, sentence_details } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO criminal_crime (criminal_id, crime_id, role, conviction_status, sentence_details) 
       VALUES (?, ?, ?, ?, ?)`,
      [criminal_id, crime_id, role, conviction_status, sentence_details]
    );
    return new Response(JSON.stringify({ message: "Criminal-Crime link added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a criminal-crime relationship
export async function PUT(req) {
  try {
    const { id, criminal_id, crime_id, role, conviction_status, sentence_details } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE criminal_crime SET 
        criminal_id = ?, crime_id = ?, role = ?, conviction_status = ?, sentence_details = ?
      WHERE id = ?`,
      [criminal_id, crime_id, role, conviction_status, sentence_details, id]
    );
    return new Response(JSON.stringify({ message: "Criminal-Crime link updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a criminal-crime relationship
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM criminal_crime WHERE id = ?", [id]);
    return new Response(JSON.stringify({ message: "Criminal-Crime link deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
