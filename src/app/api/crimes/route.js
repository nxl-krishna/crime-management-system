// src/app/api/crimes/route.js
import { db } from "../../../../lib/db";

// Get all crimes
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM crimes");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new crime
export async function POST(req) {
  try {
    const { crime_type, description, crime_date, crime_location } = await req.json();
    const connection = await db();
    await connection.execute(
      `INSERT INTO crimes (crime_type, description, crime_date, crime_location) 
       VALUES (?, ?, ?, ?)`,
      [crime_type, description, crime_date, crime_location]
    );
    return new Response(JSON.stringify({ message: "Crime added successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a crime
export async function PUT(req) {
  try {
    const { crime_id, crime_type, description, crime_date, crime_location } = await req.json();
    const connection = await db();
    await connection.execute(
      `UPDATE crimes SET 
        crime_type = ?, description = ?, crime_date = ?, crime_location = ?
      WHERE crime_id = ?`,
      [crime_type, description, crime_date, crime_location, crime_id]
    );
    return new Response(JSON.stringify({ message: "Crime updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a crime
export async function DELETE(req) {
  try {
    const { crime_id } = await req.json();
    const connection = await db();
    await connection.execute("DELETE FROM crimes WHERE crime_id = ?", [crime_id]);
    return new Response(JSON.stringify({ message: "Crime deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
