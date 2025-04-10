import { useState, useEffect } from 'react';

export default function DeleteWitness() {
  const [witnesses, setWitnesses] = useState([]);

  useEffect(() => {
    fetch('/api/witnesses')
      .then(res => res.json())
      .then(data => setWitnesses(data));
  }, []);

  const handleDeleteWitness = async (id) => {
    await fetch('/api/witnesses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ witness_id: id }),
    });
    alert('Witness deleted successfully');
    setWitnesses(witnesses.filter(witness => witness.witness_id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Delete Witness</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">Witness ID</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {witnesses.map(witness => (
            <tr key={witness.witness_id} className="border-t">
              <td className="p-2">{witness.witness_id}</td>
              <td className="p-2">{witness.first_name}</td>
              <td className="p-2">{witness.last_name}</td>
              <td className="p-2">
                <button onClick={() => handleDeleteWitness(witness.witness_id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
