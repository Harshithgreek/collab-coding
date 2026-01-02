import { useState, useEffect } from 'react';
import './FileExplorer.css';

function FileExplorer({ socket, roomId, onFileSelect, currentFile }) {
  const [fileTree, setFileTree] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['']));
  const [contextMenu, setContextMenu] = useState(null);
  const [newItemDialog, setNewItemDialog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (socket) {
      // Request file tree
      socket.emit('get-file-tree', { roomId });

      // Listen for file tree updates
      socket.on('file-tree-update', ({ tree }) => {
        setFileTree(tree);
        setLoading(false);
      });

      socket.on('file-created', ({ path }) => {
        // Refresh tree
        socket.emit('get-file-tree', { roomId });
      });

      socket.on('file-deleted', ({ path }) => {
        socket.emit('get-file-tree', { roomId });
      });

      return () => {
        socket.off('file-tree-update');
        socket.off('file-created');
        socket.off('file-deleted');
      };
    }
  }, [socket, roomId]);

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
      // Load folder contents
      socket.emit('get-folder-contents', { roomId, path: folderPath });
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file) => {
    socket.emit('open-file', { roomId, path: file.path });
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const handleCreateNew = (type) => {
    setNewItemDialog({
      type,
      parentPath: contextMenu?.item?.path || ''
    });
    setContextMenu(null);
  };

  const handleCreateSubmit = (name) => {
    if (!name.trim()) return;

    const parentPath = newItemDialog.parentPath;
    const newPath = parentPath ? `${parentPath}/${name}` : name;

    if (newItemDialog.type === 'file') {
      socket.emit('create-file', { roomId, path: newPath });
    } else {
      socket.emit('create-folder', { roomId, path: newPath });
    }

    setNewItemDialog(null);
  };

  const handleDelete = () => {
    if (contextMenu?.item && confirm(`Delete ${contextMenu.item.name}?`)) {
      socket.emit('delete-file', { roomId, path: contextMenu.item.path });
    }
    setContextMenu(null);
  };

  const handleRefresh = () => {
    socket.emit('get-file-tree', { roomId });
    setContextMenu(null);
  };

  const renderTree = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.path} style={{ marginLeft: `${level * 16}px` }}>
        {item.type === 'directory' ? (
          <div
            className="explorer-item folder"
            onClick={() => toggleFolder(item.path)}
            onContextMenu={(e) => handleContextMenu(e, item)}
          >
            <span className="icon">
              {expandedFolders.has(item.path) ? '📂' : '📁'}
            </span>
            <span className="name">{item.name}</span>
          </div>
        ) : (
          <div
            className={`explorer-item file ${currentFile === item.path ? 'active' : ''}`}
            onClick={() => handleFileClick(item)}
            onContextMenu={(e) => handleContextMenu(e, item)}
          >
            <span className="icon">{getFileIcon(item.extension)}</span>
            <span className="name">{item.name}</span>
          </div>
        )}
        {item.type === 'directory' && expandedFolders.has(item.path) && item.children && (
          <div className="folder-contents">
            {renderTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getFileIcon = (ext) => {
    const icons = {
      '.js': '📜',
      '.jsx': '⚛️',
      '.ts': '📘',
      '.tsx': '⚛️',
      '.py': '🐍',
      '.java': '☕',
      '.cpp': '⚙️',
      '.c': '⚙️',
      '.go': '🐹',
      '.html': '🌐',
      '.css': '🎨',
      '.json': '📋',
      '.md': '📝',
      '.txt': '📄'
    };
    return icons[ext] || '📄';
  };

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h3>📁 Explorer</h3>
        <div className="explorer-actions">
          <button
            onClick={() => handleCreateNew('file')}
            title="New File - Files are saved automatically and shared with everyone"
            className="btn-icon"
          >
            ➕📄
          </button>
          <button
            onClick={() => handleCreateNew('folder')}
            title="New Folder - Create folders to organize your code"
            className="btn-icon"
          >
            ➕📁
          </button>
          <button
            onClick={handleRefresh}
            title="Refresh - Reload file tree to see latest changes"
            className="btn-icon"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="explorer-content">
        {loading ? (
          <div className="explorer-loading">Loading files...</div>
        ) : fileTree.length === 0 ? (
          <div className="explorer-empty">
            <p>📂 No files yet</p>
            <p className="explorer-hint">Create your first file to get started!</p>
            <p className="explorer-hint-small">All files are saved automatically and shared with everyone in this room.</p>
            <button onClick={() => handleCreateNew('file')}>
              ➕ Create first file
            </button>
          </div>
        ) : (
          renderTree(fileTree)
        )}
      </div>

      {contextMenu && (
        <>
          <div
            className="context-menu-overlay"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <div onClick={() => handleCreateNew('file')}>New File</div>
            <div onClick={() => handleCreateNew('folder')}>New Folder</div>
            <div onClick={handleRefresh}>Refresh</div>
            {contextMenu.item && (
              <>
                <div className="separator" />
                <div onClick={handleDelete} className="danger">Delete</div>
              </>
            )}
          </div>
        </>
      )}

      {newItemDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h4>Create New {newItemDialog.type === 'file' ? 'File' : 'Folder'}</h4>
            <input
              type="text"
              placeholder={`Enter ${newItemDialog.type} name`}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateSubmit(e.target.value);
                } else if (e.key === 'Escape') {
                  setNewItemDialog(null);
                }
              }}
            />
            <div className="dialog-actions">
              <button onClick={() => setNewItemDialog(null)}>Cancel</button>
              <button
                onClick={(e) => {
                  const input = e.target.parentElement.previousSibling;
                  handleCreateSubmit(input.value);
                }}
                className="primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
