import { useState } from 'react';
import './ActivityBar.css';

function ActivityBar({
    activeView,
    onViewChange,
    showFileExplorer,
    showSearch,
    showExtensions,
    showSettings,
    userCount
}) {
    const [hoveredItem, setHoveredItem] = useState(null);

    const activityItems = [
        { id: 'explorer', icon: '📁', label: 'Explorer', active: showFileExplorer },
        { id: 'search', icon: '🔍', label: 'Search', active: showSearch },
        { id: 'extensions', icon: '🧩', label: 'Extensions', active: showExtensions },
        { id: 'users', icon: '👥', label: `Users (${userCount})`, active: activeView === 'users' },
    ];

    const bottomItems = [
        { id: 'settings', icon: '⚙️', label: 'Settings', active: showSettings },
    ];

    const handleItemClick = (itemId) => {
        onViewChange(itemId);
    };

    return (
        <div className="activity-bar">
            <div className="activity-bar-items">
                {activityItems.map(item => (
                    <div
                        key={item.id}
                        className={`activity-bar-item ${item.active ? 'active' : ''}`}
                        onClick={() => handleItemClick(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        title={item.label}
                    >
                        <span className="activity-icon">{item.icon}</span>
                        {item.id === 'users' && userCount > 0 && (
                            <span className="activity-badge">{userCount}</span>
                        )}
                        {hoveredItem === item.id && (
                            <div className="activity-tooltip">{item.label}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="activity-bar-bottom">
                {bottomItems.map(item => (
                    <div
                        key={item.id}
                        className={`activity-bar-item ${item.active ? 'active' : ''}`}
                        onClick={() => handleItemClick(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        title={item.label}
                    >
                        <span className="activity-icon">{item.icon}</span>
                        {hoveredItem === item.id && (
                            <div className="activity-tooltip">{item.label}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivityBar;
