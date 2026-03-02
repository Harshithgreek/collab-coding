import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CollaborativeEditor from './components/CollaborativeEditor';
import RoomSelector from './components/RoomSelector';
import UserPanel from './components/UserPanel';
import './App.css';

function App() {
  const [roomId, setRoomId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId] = useState(() => uuidv4());

  // Load saved username
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const [isCreating, setIsCreating] = useState(false);

  const handleJoinRoom = (room, name, creating) => {
    setRoomId(room);
    setUserName(name);
    setIsCreating(!!creating);
    localStorage.setItem('userName', name);
  };

  const handleLeaveRoom = () => {
    setRoomId(null);
  };

  return (
    <div className="app">
      {!roomId ? (
        <RoomSelector onJoinRoom={handleJoinRoom} initialUserName={userName} />
      ) : (
        <div className="editor-container">
          <CollaborativeEditor
            roomId={roomId}
            userName={userName}
            userId={userId}
            isCreating={isCreating}
            onLeaveRoom={handleLeaveRoom}
          />
        </div>
      )}
    </div>
  );
}

export default App;
