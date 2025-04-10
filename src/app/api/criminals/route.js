// src/app/api/criminals/route.js
import { db } from "../../../../lib/db";

// Get all criminals
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute("SELECT * FROM criminals");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Add a new criminal
export async function POST(req) {
  try {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      address,
      phone_number,
      nationality,
      physical_marks,
      photo_url,
    } = await req.json();

    const connection = await db();
    await connection.execute(
      `INSERT INTO criminals (
        first_name, last_name, gender, date_of_birth, address, phone_number, nationality, physical_marks, photo_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        gender,
        date_of_birth,
        address,
        phone_number,
        nationality,
        physical_marks,
        photo_url,
      ]
    );

    return new Response(
      JSON.stringify({ message: "Criminal added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update a criminal's details
export async function PUT(req) {
  try {
    const {
      criminal_id,
      first_name,
      last_name,
      gender,
      date_of_birth,
      address,
      phone_number,
      nationality,
      physical_marks,
      photo_url,
    } = await req.json();

    const connection = await db();
    await connection.execute(
      `UPDATE criminals SET 
        first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, 
        address = ?, phone_number = ?, nationality = ?, physical_marks = ?, photo_url = ? 
      WHERE criminal_id = ?`,
      [
        first_name,
        last_name,
        gender,
        date_of_birth,
        address,
        phone_number,
        nationality,
        physical_marks,
        photo_url,
        criminal_id,
      ]
    );

    return new Response(
      JSON.stringify({ message: "Criminal updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete a criminal
export async function DELETE(req) {
  try {
    const { criminal_id } = await req.json();

    const connection = await db();
    await connection.execute("DELETE FROM criminals WHERE criminal_id = ?", [criminal_id]);

    return new Response(
      JSON.stringify({ message: "Criminal deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
