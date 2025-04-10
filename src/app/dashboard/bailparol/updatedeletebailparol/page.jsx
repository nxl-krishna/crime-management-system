"use client"
import { useState, useEffect } from 'react';

export default function BailParoleManagement() {
  const [formData, setFormData] = useState({ criminal_id: '', bail_status: 'Pending', parole_status: 'Pending', bail_amount: '', release_date: '' });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('/api/bail-parole')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Data:', data); // Log the response data
        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRecords([]); // Set to an empty array on error
      });
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditRecord = (record) => {
    setEditId(record.id);
    setFormData({
      criminal_id: record.id,
      bail_status: record.bail_status,
      parole_status: record.parole_status,
      bail_amount: record.bail_amount,
      release_date: record.release_date,
    });
  };

  const handleUpdateRecord = async () => {
    await fetch('/api/bail-parole', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: editId }),
    });
    alert('Bail/Parole record updated successfully');
    setEditId(null);
    setFormData({ criminal_id: '', bail_status: 'Pending', parole_status: 'Pending', bail_amount: '', release_date: '' });

    // Refresh the records list
    fetch('/api/bail-parole')
      .then(res => res.json())
      .then(data => setRecords(data));
  };

  const handleDeleteRecord = async (id) => {
    await fetch('/api/bail-parole', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    alert('Bail/Parole record deleted successfully');
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Bail/Parole Management</h1>

      {editId && (
        <div className="mb-4">
          <input name="bail_status" placeholder="Bail Status" value={formData.bail_status} onChange={handleChange} className="p-2 m-1 border rounded" />
          <input name="parole_status" placeholder="Parole Status" value={formData.parole_status} onChange={handleChange} className="p-2 m-1 border rounded" />
          <input name="bail_amount" placeholder="Bail Amount" value={formData.bail_amount} onChange={handleChange} className="p-2 m-1 border rounded" />
          <input name="release_date" type="date" value={formData.release_date} onChange={handleChange} className="p-2 m-1 border rounded" />
          <button onClick={handleUpdateRecord} className="bg-blue-500 text-white p-2 m-1 rounded">Save</button>
          <button onClick={() => setEditId(null)} className="bg-gray-500 text-white p-2 m-1 rounded">Cancel</button>
        </div>
      )}

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Bail Status</th>
            <th className="p-2">Parole Status</th>
            <th className="p-2">Bail Amount</th>
            <th className="p-2">Release Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id} className="border-t">
              <td className="p-2">{record.id}</td>
              <td className="p-2">{record.bail_status}</td>
              <td className="p-2">{record.parole_status}</td>
              <td className="p-2">{record.bail_amount}</td>
              <td className="p-2">{record.release_date}</td>
              <td className="p-2">
                <button onClick={() => handleEditRecord(record)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                <button onClick={() => handleDeleteRecord(record.id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
