import React, { useEffect, useState } from 'react';


function Activities() {
  const [activities, setActivities] = useState([]);
  const codespace = window.REACT_APP_CODESPACE_NAME || 'localhost';
  const baseUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Timestamp</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.timestamp ? new Date(activity.timestamp).toLocaleString() : ''}</td>
                  <td>{activity.user?.username || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
