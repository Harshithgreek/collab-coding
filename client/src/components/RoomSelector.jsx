import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './RoomSelector.css';

function RoomSelector({ onJoinRoom, initialUserName }) {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState(initialUserName || '');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const finalRoomId = isCreating ? uuidv4().split('-')[0] : roomId.trim();
    
    if (!finalRoomId) {
      alert('Please enter a room ID');
      return;
    }

    onJoinRoom(finalRoomId, userName.trim());
  };

  const handleCreateRoom = () => {
    setIsCreating(true);
    setRoomId(uuidv4().split('-')[0]);
  };

  return (
    <div className="room-selector">
      <div className="room-selector-card">
        <h1>🚀 Collaborative Code Editor</h1>
        <p className="subtitle">Real-time coding with your team</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Your Name</label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId">Room ID</label>
            <input
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setIsCreating(false);
              }}
              placeholder="Enter room ID to join"
              disabled={isCreating}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              {isCreating ? 'Create & Join Room' : 'Join Room'}
            </button>
            
            {!isCreating && (
              <button
                type="button"
                onClick={handleCreateRoom}
                className="btn-secondary"
              >
                Create New Room
              </button>
            )}
          </div>
        </form>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Real-time Sync</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👥</span>
            <span>Multi-user</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Syntax Highlighting</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomSelector;
