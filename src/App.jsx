import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [userId, setUserId] = useState('')
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSessions = () => {
    if (!userId) return
    setLoading(true)
    setError(null)
    setSessions([])

    axios.get(`http://localhost:3000/participants/remaining-sessions/${Number(userId)}`)
      .then(res => {
        // Check if the response is an array
        if (Array.isArray(res.data)) {
          setSessions(res.data)
        } else {
          setError(res.data.message || 'No sessions found')
        }
        setLoading(false)
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message)
        } else {
          setError('Failed to fetch remaining sessions')
        }
        setLoading(false)
      })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Check Remaining Sessions</h1>

      <div style={{ marginBottom: 10 }}>
        <label>User ID: </label>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={fetchSessions} style={{ marginLeft: 10 }}>Check</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && sessions.length > 0 && (
        <div>
          {sessions.map(session => (
            <div key={session.sessionId} style={{ marginBottom: 15, border: '1px solid #ccc', padding: 10 }}>
              <h3>{session.sessionTitle}</h3>
              <p>{session.sessionDescription}</p>
              <p>Category: {session.category}</p>
              <p>Duration: {session.duration}</p>
              <p>Location: {session.location}</p>
              <p>Speakers: {session.speakers.map(s => s.fullName).join(', ')}</p>
              <p>Event: {session.event.eventTitle}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && sessions.length === 0 && (
        <p>No sessions found for User {userId}</p>
      )}
    </div>
  )
}

export default App
