"use client"
import { useState } from 'react';

export default function AddEvidence() {
  const [formData, setFormData] = useState({
    crime_id: '',
    evidence_type: '',
    description: '',
    collected_by: '',
    collection_date: '',
    storage_location: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEvidence = async () => {
    try {
      const response = await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Evidence added successfully!');
        setFormData({
          crime_id: '',
          evidence_type: '',
          description: '',
          collected_by: '',
          collection_date: '',
          storage_location: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Add Evidence</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace('_', ' ').toUpperCase()}
            value={formData[key]}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-4"
          />
        ))}
        <button onClick={addEvidence} className="bg-green-600 text-white p-3 rounded w-full">Add Evidence</button>
      </div>
      <a href="/dashboard/evidence/updatedeleteevidence">
  <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
   update/delete
  </button>
</a>
    </div>
  );
}
