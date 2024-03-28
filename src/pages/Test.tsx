import React from 'react'
import SocketContextComponent from '../contexts/SocketContextComponent'

export default function Test() {
  // const socket = useSocket('ws://localhost:4000/admin', {
  //   reconnectionAttempts: 5,
  //   reconnectionDelay: 5000,
  //   autoConnect: false,
  // })

  // React.useEffect(() => {
  //   socket.connect()
  //   socket.emit('handshake', { _id: 'hjjk' })
  // }, [socket])

  return (
    <SocketContextComponent>
      <div>
        <p className="text-white">Test</p>
      </div>
    </SocketContextComponent>
  )
}
