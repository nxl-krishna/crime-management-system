"use client"
import { useState, useEffect } from 'react';

export default function UpdateDeleteEvidence() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [formData, setFormData] = useState({
    evidence_id: '',
    crime_id: '',
    evidence_type: '',
    description: '',
    collected_by: '',
    collection_date: '',
    storage_location: ''
  });

  useEffect(() => {
    fetchEvidence();
  }, []);

  const fetchEvidence = async () => {
    try {
      const response = await fetch('/api/evidence');
      const data = await response.json();
      setEvidenceList(data);
    } catch (error) {
      alert(`Error fetching evidence: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEvidence = async () => {
    try {
      const response = await fetch('/api/evidence', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Evidence updated successfully!');
        fetchEvidence();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const deleteEvidence = async (evidence_id) => {
    try {
      const response = await fetch('/api/evidence', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidence_id })
      });
      if (response.ok) {
        alert('Evidence deleted successfully!');
        fetchEvidence();
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
      <h1 className="text-4xl font-bold text-center">Update/Delete Evidence</h1>
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
        <button onClick={updateEvidence} className="bg-blue-600 text-white p-3 rounded w-full mb-4">Update Evidence</button>
      </div>

      <h2 className="text-2xl font-bold mt-8">Evidence List</h2>
      {evidenceList.map((evidence) => (
        <div key={evidence.evidence_id} className="bg-white p-4 rounded-lg shadow-md mb-2">
          <p><strong>Evidence ID:</strong> {evidence.evidence_id}</p>
          <p><strong>Crime ID:</strong> {evidence.crime_id}</p>
          <p><strong>Evidence Type:</strong> {evidence.evidence_type}</p>
          <p><strong>Description:</strong> {evidence.description}</p>
          <p><strong>Collected By:</strong> {evidence.collected_by}</p>
          <p><strong>Collection Date:</strong> {evidence.collection_date}</p>
          <p><strong>Storage Location:</strong> {evidence.storage_location}</p>
          <button onClick={() => deleteEvidence(evidence.evidence_id)} className="bg-red-600 text-white p-2 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}
