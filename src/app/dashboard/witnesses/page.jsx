"use client"
import { useState } from 'react';

export default function WitnessManagement() {
  const [formData, setFormData] = useState({ crime_id: '', first_name: '', last_name: '', contact_info: '', statement: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddWitness = async () => {
    await fetch('/api/witnesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Witness added successfully');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Witness</h1>

      <div className="mb-4">
        <input name="crime_id" placeholder="Crime ID" onChange={handleChange} className="p-2 m-1 border rounded" />
        <input name="first_name" placeholder="First Name" onChange={handleChange} className="p-2 m-1 border rounded" />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} className="p-2 m-1 border rounded" />
        <input name="contact_info" placeholder="Contact Info" onChange={handleChange} className="p-2 m-1 border rounded" />
        <textarea name="statement" placeholder="Statement" onChange={handleChange} className="p-2 m-1 border rounded w-full"></textarea>
        <button onClick={handleAddWitness} className="bg-blue-500 text-white p-2 m-1 rounded">Add Witness</button>
      </div>
      <a href="/dashboard/witnesses/updatedeletewitenesses">
  <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
   update/delete
  </button>
</a>
    </div>
  );
}
