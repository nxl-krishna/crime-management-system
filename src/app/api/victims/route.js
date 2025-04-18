// src/app/api/victims/route.js
import { db } from "../../../../lib/db";

// Get all victims with crime details
export async function GET() {
  try {
    const connection = await db;
    const [rows] = await connection.execute(`
      SELECT v.victim_id, v.first_name, v.last_name, v.age, v.gender, v.contact_info, v.injuries, v.created_at,
             c.crime_id, c.crime_type, c.crime_date, c.crime_location
      FROM victims v
      JOIN crimes c ON v.crime_id = c.crime_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new victim record
export async function POST(req) {
  try {
    const { crime_id, first_name, last_name, age, gender, contact_info, injuries } = await req.json();
    const connection = await db;
    await connection.execute(
      `INSERT INTO victims (crime_id, first_name, last_name, age, gender, contact_info, injuries)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [crime_id, first_name, last_name, age, gender, contact_info, injuries]
    );
    return new Response(JSON.stringify({ message: "Victim added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a victim record
export async function PUT(req) {
  try {
    const { victim_id, first_name, last_name, age, gender, contact_info, injuries } = await req.json();
    const connection = await db;
    await connection.execute(
      `UPDATE victims SET 
        first_name = ?, last_name = ?, age = ?, gender = ?, contact_info = ?, injuries = ?
      WHERE victim_id = ?`,
      [first_name, last_name, age, gender, contact_info, injuries, victim_id]
    );
    return new Response(JSON.stringify({ message: "Victim record updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a victim record
export async function DELETE(req) {
  try {
    const { victim_id } = await req.json();
    const connection = await db;
    await connection.execute("DELETE FROM victims WHERE victim_id = ?", [victim_id]);
    return new Response(JSON.stringify({ message: "Victim record deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
