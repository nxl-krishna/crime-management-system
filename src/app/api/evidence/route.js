// src/app/api/evidence/route.js
import { db } from "../../../../lib/db";

// Get all evidence with joined details (crime and officer)
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(`
      SELECT ev.evidence_id, ev.evidence_type, ev.description, ev.collection_date, ev.storage_location,
             cr.crime_type, cr.crime_date, cr.crime_location,
             ofc.first_name AS collected_by_first_name, ofc.last_name AS collected_by_last_name, ofc.ranks, ofc.station
      FROM evidence ev
      JOIN crimes cr ON ev.crime_id = cr.crime_id
      JOIN officers ofc ON ev.collected_by = ofc.officer_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add new evidence
export async function POST(req) {
  try {
    const { crime_id, evidence_type, description, collected_by, collection_date, storage_location } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO evidence (crime_id, evidence_type, description, collected_by, collection_date, storage_location) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [crime_id, evidence_type, description, collected_by, collection_date, storage_location]
    );
    return new Response(JSON.stringify({ message: "Evidence added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update evidence details
export async function PUT(req) {
  try {
    const { evidence_id, crime_id, evidence_type, description, collected_by, collection_date, storage_location } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE evidence SET 
        crime_id = ?, evidence_type = ?, description = ?, collected_by = ?, collection_date = ?, storage_location = ?
      WHERE evidence_id = ?`,
      [crime_id, evidence_type, description, collected_by, collection_date, storage_location, evidence_id]
    );
    return new Response(JSON.stringify({ message: "Evidence updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete evidence
export async function DELETE(req) {
  try {
    const { evidence_id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM evidence WHERE evidence_id = ?", [evidence_id]);
    return new Response(JSON.stringify({ message: "Evidence deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
