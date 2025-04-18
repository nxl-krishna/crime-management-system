"use client"
import { useState } from 'react';

export default function AddBailParole() {
  const [formData, setFormData] = useState({ criminal_id: '', bail_status: 'Pending', parole_status: 'Pending', bail_amount: '', release_date: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRecord = async () => {
    await fetch('/api/bail_parole', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Bail/Parole record added successfully');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Bail/Parole Record</h1>

      <div className="mb-4">
        <input name="criminal_id" placeholder="Criminal ID" onChange={handleChange} className="p-2 m-1 border rounded" />
        <select name="bail_status" onChange={handleChange} className="p-2 m-1 border rounded">
          <option value="Pending">Pending</option>
          <option value="Granted">Granted</option>
          <option value="Denied">Denied</option>
        </select>
        <select name="parole_status" onChange={handleChange} className="p-2 m-1 border rounded">
          <option value="Pending">Pending</option>
          <option value="Granted">Granted</option>
          <option value="Denied">Denied</option>
        </select>
        <input name="bail_amount" placeholder="Bail Amount" onChange={handleChange} className="p-2 m-1 border rounded" />
        <input name="release_date" type="date" onChange={handleChange} className="p-2 m-1 border rounded" />
        <button onClick={handleAddRecord} className="bg-blue-500 text-white p-2 m-1 rounded">Add Record</button>
      </div>
      <a href="/dashboard/bailparol/updatedeletebailparol">
  <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
   update/delete
  </button>
</a>

    </div>
  );
}
