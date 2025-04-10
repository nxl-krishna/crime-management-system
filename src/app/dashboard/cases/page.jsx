"use client"
import { useState } from 'react';

export default function ManageCases() {
  const [formData, setFormData] = useState({
        crime_id: '',
    officer_id: '',
    case_status: 'Open',
    investigation_report: '',
    verdict: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCase = async () => {
    try {
      const response = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Case added successfully!');
        setFormData({
          
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
      <h1 className="text-4xl font-bold text-center">Add Case</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          key !== 'case_status' ? (
            <input
              key={key}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            />
          ) : (
            <select
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
            </select>
          )
        ))}
        <button onClick={addCase} className="bg-green-600 text-white p-3 rounded w-full">Add Case</button>
      </div>
    </div>
  );
}
