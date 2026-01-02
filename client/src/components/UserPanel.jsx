import './UserPanel.css';

function UserPanel({ users, currentUserId }) {
  const userArray = Array.from(users.values());

  return (
    <div className="user-panel">
      <h3>Active Users ({userArray.length})</h3>
      <div className="user-list">
        {userArray.map((user) => (
          <div key={user.id} className="user-item">
            <div
              className="user-avatar"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">
                {user.name}
                {user.id === currentUserId && ' (You)'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPanel;
