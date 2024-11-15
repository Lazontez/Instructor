import React, { useState } from 'react';

function LogForm() {
  const [minutes, setMinutes] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log(`Logged ${minutes} minutes of ${activity}`);
    setMinutes('');
    setActivity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Minutes"
      />
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Activity"
      />
      <button type="submit">Add Log</button>
    </form>
  );
}

export default LogForm;