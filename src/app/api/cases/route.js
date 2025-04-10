  // src/app/api/cases/route.js
  import { db } from "../../../../lib/db";

  // Get all cases with joined details (crime and officer)
  export async function GET() {
    try {
      const connection = await db();
      const [rows] = await connection.execute(`
        SELECT cs.case_id, cs.case_status, cs.investigation_report, cs.verdict, cs.created_at,
              cr.crime_type, cr.description AS crime_description, cr.crime_date, cr.crime_location,
              ofc.first_name AS officer_first_name, ofc.last_name AS officer_last_name, ofc.ranks, ofc.station
        FROM cases cs
        JOIN crimes cr ON cs.crime_id = cr.crime_id
        JOIN officers ofc ON cs.officer_id = ofc.officer_id
      `);
      return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  // Add a new case
  export async function POST(req) {
    try {
      const { crime_id, officer_id, case_status, investigation_report, verdict } = await req.json();
      const connection = await db();
      await connection.execute(
        `INSERT INTO cases (crime_id, officer_id, case_status, investigation_report, verdict) 
        VALUES (?, ?, ?, ?, ?)`,
        [crime_id, officer_id, case_status, investigation_report, verdict]
      );
      return new Response(JSON.stringify({ message: "Case added successfully" }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  // Update case details
  export async function PUT(req) {
    try {
      const { case_id, crime_id, officer_id, case_status, investigation_report, verdict } = await req.json();
      const connection = await db();
      await connection.execute(
        `UPDATE cases SET 
          crime_id = ?, officer_id = ?, case_status = ?, investigation_report = ?, verdict = ?
        WHERE case_id = ?`,
        [crime_id, officer_id, case_status, investigation_report, verdict, case_id]
      );
      return new Response(JSON.stringify({ message: "Case updated successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  // Delete a case
  export async function DELETE(req) {
    try {
      const { case_id } = await req.json();
      const connection = await db();
      await connection.execute("DELETE FROM cases WHERE case_id = ?", [case_id]);
      return new Response(JSON.stringify({ message: "Case deleted successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
