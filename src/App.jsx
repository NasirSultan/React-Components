import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000') // replace with your backend URL

const App = () => {
  const [userId, setUserId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [joined, setJoined] = useState(false)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [participants, setParticipants] = useState([]) // {userId, stream}
  const [cameraOn, setCameraOn] = useState(false)
  const [micOn, setMicOn] = useState(false)
  const [lobbyUsers, setLobbyUsers] = useState([]) // users in lobby

  const localVideoRef = useRef()
  const localStreamRef = useRef()
  const peersRef = useRef({}) // userId -> RTCPeerConnection

  // Pre-join: create empty stream with camera/mic off
  const prepareLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    stream.getVideoTracks()[0].enabled = cameraOn
    stream.getAudioTracks()[0].enabled = micOn
    localStreamRef.current = stream
    localVideoRef.current.srcObject = stream
  }

  const joinSession = async () => {
    if (!userId || !sessionId) return
    if (!localStreamRef.current) await prepareLocalStream()

    socket.emit('joinSession', { sessionId, userId })
    setJoined(true)
  }

  const toggleCamera = () => {
    if (!localStreamRef.current) return
    const track = localStreamRef.current.getVideoTracks()[0]
    track.enabled = !cameraOn
    setCameraOn(prev => !prev)
    if (!cameraOn) {
      // update all peers
      Object.values(peersRef.current).forEach(peer => {
        const sender = peer.getSenders().find(s => s.track.kind === 'video')
        sender.replaceTrack(track)
      })
    }
  }

  const toggleMic = () => {
    if (!localStreamRef.current) return
    const track = localStreamRef.current.getAudioTracks()[0]
    track.enabled = !micOn
    setMicOn(prev => !prev)
  }

  // Peer creation
  const createPeer = (remoteUserId, isInitiator) => {
    const peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })

    // Add local tracks
    localStreamRef.current.getTracks().forEach(track => peer.addTrack(track, localStreamRef.current))

    const remoteStream = new MediaStream()
    peer.ontrack = e => {
      e.streams[0].getTracks().forEach(track => remoteStream.addTrack(track))
      setParticipants(prev => {
        if (!prev.find(p => p.userId === remoteUserId)) {
          return [...prev, { userId: remoteUserId, stream: remoteStream }]
        }
        return prev
      })
    }

    peer.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('signal', { targetUserId: remoteUserId, signalData: { candidate: event.candidate } })
      }
    }

    peersRef.current[remoteUserId] = peer

    if (isInitiator) {
      peer.createOffer().then(offer => {
        peer.setLocalDescription(offer)
        socket.emit('signal', { targetUserId: remoteUserId, signalData: offer })
      })
    }
  }

  // Send chat message
  const sendMessage = () => {
    if (!messageInput) return
    socket.emit('sendMessage', { sessionId, userId, message: messageInput })
    setMessageInput('')
  }

  // Screen sharing
  const shareScreen = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    const track = screenStream.getTracks()[0]
    Object.values(peersRef.current).forEach(peer => {
      const sender = peer.getSenders().find(s => s.track.kind === 'video')
      sender.replaceTrack(track)
    })
    localVideoRef.current.srcObject = screenStream
    track.onended = () => {
      localVideoRef.current.srcObject = localStreamRef.current
      Object.values(peersRef.current).forEach(peer => {
        const sender = peer.getSenders().find(s => s.track.kind === 'video')
        sender.replaceTrack(localStreamRef.current.getVideoTracks()[0])
      })
    }
  }

  // Handle socket events
  useEffect(() => {
    socket.on('lobbyUsers', users => setLobbyUsers(users)) // show users in lobby
    if (!joined) return

    socket.on('existingParticipants', existing => existing.forEach(remoteUserId => createPeer(remoteUserId, true)))
    socket.on('participantJoined', remoteUserId => createPeer(remoteUserId, false))
    socket.on('participantLeft', remoteUserId => {
      peersRef.current[remoteUserId]?.close()
      delete peersRef.current[remoteUserId]
      setParticipants(prev => prev.filter(p => p.userId !== remoteUserId))
    })
    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]))
    socket.on('signal', async ({ from, signalData }) => {
      const peer = peersRef.current[from]
      if (!peer) return
      if (signalData.type === 'offer') {
        await peer.setRemoteDescription(new RTCSessionDescription(signalData))
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        socket.emit('signal', { targetUserId: from, signalData: answer })
      } else if (signalData.type === 'answer') {
        await peer.setRemoteDescription(new RTCSessionDescription(signalData))
      } else if (signalData.candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(signalData.candidate))
      }
    })

    return () => {
      if (joined) socket.emit('leaveSession', { sessionId, userId })
    }
  }, [joined])

  // Pre-join lobby
  if (!joined) {
    return (
      <div>
        <h2>Join Session</h2>
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input placeholder="Session ID" value={sessionId} onChange={e => setSessionId(e.target.value)} />
        <div>
          <button onClick={toggleCamera}>{cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}</button>
          <button onClick={toggleMic}>{micOn ? 'Mute' : 'Unmute'}</button>
        </div>
        <video ref={localVideoRef} autoPlay muted style={{ width: '200px', backgroundColor: 'black', margin: '10px 0' }} />
        <button onClick={joinSession}>Join Session</button>
        <h3>Users in Lobby:</h3>
        <ul>
          {lobbyUsers.map(u => <li key={u}>{u}</li>)}
        </ul>
      </div>
    )
  }

  // Main session UI
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={toggleCamera}>{cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}</button>
        <button onClick={toggleMic}>{micOn ? 'Mute' : 'Unmute'}</button>
        <button onClick={shareScreen}>Share Screen</button>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <video ref={localVideoRef} autoPlay muted style={{ width: '200px', backgroundColor: 'black' }} />
        {participants.map(p => (
          <video key={p.userId} ref={el => el && (el.srcObject = p.stream)} autoPlay style={{ width: '200px', backgroundColor: 'black' }} />
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid gray', padding: '5px' }}>
          {messages.map((m, i) => (
            <div key={i}><b>{m.userId}</b>: {m.message}</div>
          ))}
        </div>
        <input value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Type message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
