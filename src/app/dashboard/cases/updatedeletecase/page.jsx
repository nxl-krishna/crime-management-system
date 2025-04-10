"use client"
import { useState } from 'react';

export default function ManageCases() {
  const [formData, setFormData] = useState({
    case_id: '',
    crime_id: '',
    officer_id: '',
    case_status: 'Open',
    investigation_report: '',
    verdict: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCase = async () => {
    try {
      const response = await fetch('/api/cases', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Case updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const deleteCase = async () => {
    try {
      const response = await fetch('/api/cases', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: formData.case_id })
      });

      if (response.ok) {
        alert('Case deleted successfully!');
        setFormData({
          case_id: '',
          crime_id: '',
          officer_id: '',
          case_status: 'Open',
          investigation_report: '',
          verdict: ''
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
      <h1 className="text-4xl font-bold text-center">Manage Cases</h1>
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
        <button onClick={updateCase} className="bg-yellow-600 text-white p-3 rounded w-full mb-2">Update Case</button>
        <button onClick={deleteCase} className="bg-red-600 text-white p-3 rounded w-full">Delete Case</button>
      </div>
    </div>
  );
}
