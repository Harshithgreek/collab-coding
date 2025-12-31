# Collaborative Code Editor

A production-ready real-time collaborative code editor built with React, Socket.IO, and Monaco Editor.

## 🚀 Features

### Core Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously
- **💾 Persistent File Storage**: All files are automatically saved on the server per room
- **🔄 Real-Time Sync**: File changes sync instantly across all users in the room
- **📁 File Explorer**: Browse, create, and manage files and folders with full persistence
- **Multi-file Support**: Work with multiple files in an organized project structure
- **Code Execution**: Compile and run code in JavaScript, Python, Java, C++, C, Go, and TypeScript
- **Live Output**: See execution results in real-time with all collaborators
- **Auto-save**: Save files with Ctrl+S, all changes persist on server
- **Operational Transformation**: Conflict-free synchronization using OT algorithm
- **Room Management**: Create or join rooms with unique IDs and isolated workspaces
- **Multi-language Support**: JavaScript, TypeScript, Python, Java, C++, and more
- **User Presence**: See active users with color-coded avatars
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-reconnection**: Handles network disconnections gracefully

### 💾 Persistent Storage Features

- **Room-Based Workspaces**: Each room gets its own isolated file storage
- **Automatic Saving**: Files are saved to server and persist across sessions
- **File Operations**: Create, edit, delete, and organize files and folders
- **Shared Access**: Everyone in the room can access and edit all files
- **Project Organization**: Use folders to structure your codebase
- **File History**: Files remain available even after users leave the room
- **Instant Sync**: All file operations broadcast to all room members in real-time

### Advanced Features

- **🎨 Theme Switcher**: Choose between Dark, Light, and High Contrast themes
- **📑 Multi-Tab Editing**: Open and switch between multiple files in tabs
- **⚙️ Settings Panel**: Customize editor with configurable options:
  - Font size adjustment
  - Minimap toggle
  - Word wrap
  - Line numbers
  - Auto-save
  - Format on save
  - Tab size
  - Bracket colorization
  - Code folding
  - Whitespace rendering
- **💻 Integrated Terminal**: Execute shell commands directly within the editor
- **🔍 Search & Replace**: Find and replace text across open files with regex support
- **🧩 Extensions Manager**: Install and manage editor extensions (plugin system)
- **Keyboard Shortcuts**:
  - Ctrl+Enter to run code
  - Ctrl+S to save files
  - Ctrl+F to search

## 🏗️ Architecture

### Server (Node.js + Express + Socket.IO)

- **RoomManager**: Manages rooms, users, and document state
- **CodeExecutor**: Executes code in multiple languages with sandboxing
- **FileSystemManager**: Handles file/folder operations with workspace isolation
- **Operational Transformation**: Ensures consistency across concurrent edits
- **Event-driven**: Real-time sync via WebSocket events
- **Scalable**: Clean separation of concerns

### Client (React + Monaco Editor)

- **CollaborativeEditor**: Main editor component with Socket.IO integration
- **FileExplorer**: Tree-view file browser with create/delete operations
- **FileTabs**: Multi-tab interface for managing open files
- **ThemeSwitcher**: Toggle between editor themes
- **SettingsPanel**: Configurable editor preferences
- **Terminal**: Integrated terminal for shell commands
- **SearchPanel**: Find and replace functionality
- **ExtensionsManager**: Plugin management system
- **RoomSelector**: Room creation/joining interface
- **UserPanel**: Shows active collaborators
- **LanguageSelector**: Switch programming languages
- **OutputPanel**: Displays code execution results
- **Optimized**: Debounced updates and efficient rendering

## 📦 Installation

```bash
# Install dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

## 🛠️ Development

````bash
# Run both client and server concurrently
npm run dev

# Or run separately:
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
n```

The client runs on `http://localhost:5173` and server on `http://localhost:3001`.

## 📚 How to Use

### Creating and Managing Files

#### 1. Create a New File
- Click the **➕📄** button in the File Explorer
- Enter a filename (e.g., `app.js`, `index.html`, `script.py`)
- The file is created and automatically saved on the server
- All users in the room can see and access the file immediately

#### 2. Create a Folder
- Click the **➕📁** button in the File Explorer
- Enter a folder name (e.g., `src`, `components`, `utils`)
- Organize your files using folders for better structure

#### 3. Open and Edit Files
- Click any file in the File Explorer to open it
- Edit the code in the Monaco editor
- Press **Ctrl+S** (or Cmd+S on Mac) to save changes
- Changes are saved to the server and synced to all users

#### 4. Delete Files/Folders
- Right-click on any file or folder
- Select "Delete" from the context menu
- The file/folder is removed for everyone in the room

### Collaborative Editing

1. **Create or Join a Room**
   - Enter your name on the home screen
   - Create a new room or enter an existing room ID
   - Share the room ID with your collaborators

2. **Work Together**
   - All users see the same file structure
   - Create files and folders that everyone can access
   - Edit files simultaneously with real-time sync
   - Run code and see output together

3. **File Persistence**
   - All files are automatically saved on the server
   - Files remain available even after everyone leaves
   - Return to the same room later to access your files
   - Each room has its own isolated workspace

### Example Workflow

```bash
# Team members join room "project-abc"
# User A creates folder structure:
src/
├── index.js
├── components/
│   ├── App.jsx
│   └── Header.jsx
└── utils/
    └── helpers.js

# User B can immediately see and edit all files
# User C joins later and has access to everything
# All saves go to server/workspace/project-abc/
```

## 🚢 Production Build

```bash
# Build client for production
npm run build

# Start production server
npm start
````

## 🔧 Configuration

### Server (.env)

```env
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3001
```

## 📝 Key Implementation Details

### Code Execution Engine

- Supports JavaScript, Python, Java, C++, C, Go, and TypeScript
- Isolated execution with 10-second timeout
- Temporary file management with automatic cleanup
- Real-time output broadcasting to all room participants
- Execution time tracking

### Real-time Synchronization

- Uses Socket.IO for bidirectional communication
- Change events contain operation details (offset, length, text)
- Version tracking prevents stale updates

### Operational Transformation

- Transforms concurrent operations to maintain consistency
- Handles conflicts when multiple users edit simultaneously
- Operations are applied and broadcast to all clients

### Performance Optimizations

- Debounced cursor position updates (100ms)
- Code splitting for Monaco Editor
- Efficient re-rendering with React hooks
- Automatic cleanup of inactive rooms

### Room Management

- UUID-based room IDs
- User presence tracking with colors
- Auto-delete empty rooms after 5 minutes
- Persistent room state during user reconnections

## 🎯 Usage

1. **Create a Room**: Enter your name and click "Create New Room"
2. **Share Link**: Copy and share the room link with collaborators
3. **Join Room**: Others can join using the room ID
4. **Browse Files**: Use the file explorer on the left to navigate
5. **Create Files**: Click ➕📄 to create new files or ➕📁 for folders
6. **Open Files**: Click any file in the explorer to open it
7. **Edit Code**: All changes sync in real-time with collaborators
8. **Save Files**: Press Ctrl+S or click Save button (changes tracked with \*)
9. **Change Language**: Select from 12+ programming languages
10. **Run Code**: Click "Run" button or press Ctrl+Enter to execute code
11. **View Output**: See execution results in the output panel below the editor

## 📂 Workspace Structure

The editor creates a workspace folder with:

```
workspace/
├── src/          # Source code files
├── tests/        # Test files
└── docs/         # Documentation
```

All files are isolated per session and stored in the server's workspace directory.

## 🎯 Using New Features

### Theme Switcher

Click the theme buttons in the header to switch between:

- 🌙 **Dark Theme** (default) - Easy on the eyes
- ☀️ **Light Theme** - Classic bright interface
- ⚡ **High Contrast** - Maximum visibility

### Multi-Tab Editing

- Open files from the file explorer - they automatically appear as tabs
- Click tabs to switch between open files
- Close tabs with the × button
- Unsaved changes are marked with a dot (●)

### Settings Panel

Click the ⚙️ icon to customize:

- **Editor Appearance**: Minimap, line numbers, font size
- **Editor Behavior**: Auto-save, format on save, tab size
- **Advanced Features**: Bracket colorization, code folding, whitespace rendering

### Integrated Terminal

- Terminal appears at the bottom of the editor
- Click ⬆️ to expand, ⬇️ to collapse
- Execute shell commands (npm install, git status, etc.)
- Commands are broadcast to all room participants
- Output is synchronized in real-time

### Search & Replace

Click the 🔍 icon to:

- Search for text in the current file
- Replace single or all occurrences
- Use regex patterns for advanced searches
- Toggle case sensitivity and whole word matching

### Extensions Manager

Click the 🧩 icon to:

- Browse available extensions in the Marketplace
- Install new extensions
- Enable/disable installed extensions
- Uninstall extensions you no longer need

## 💻 Compiler Prerequisites

To use the code execution feature, ensure you have the following installed:

- **Node.js** (for JavaScript)
- **Python** (for Python code)
- **JDK** (for Java code)
- **GCC/G++** (for C/C++ code)
- **Go** (for Go code)
- **TypeScript** (`ts-node` for TypeScript)

If a language compiler/interpreter is not installed, execution for that language will fail with an appropriate error message.

## 🛡️ Error Handling

- Connection status indicator
- Automatic reconnection with exponential backoff
- Graceful degradation on network issues
- Error notifications for failed operations

## 📚 Tech Stack

### Frontend

- React 18
- Monaco Editor (VS Code editor)
- Socket.IO Client
- Vite (build tool)

### Backend

- Node.js
- Express
- Socket.IO
- Operational Transformation

## 🔐 Security Considerations

For production deployment:

- Add authentication (JWT, OAuth)
- Rate limiting on Socket.IO events
- Input sanitization
- HTTPS/WSS
- CORS configuration
- Content Security Policy

## 🚀 Deployment

### Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Docker

```dockerfile
# Example Dockerfile included in project
docker build -t collab-editor .
docker run -p 3001:3001 your-app
```

### Environment Variables

Set `CLIENT_URL` and `VITE_SERVER_URL` for production domains.

## 📄 License

MIT

## 👨‍💻 Development Notes

- Server uses ES modules (`type: "module"`)
- Client uses Vite for fast HMR
- Monaco Editor is code-split for optimal loading
- Room cleanup runs periodically to free memory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

---

Built with ❤️ using React, Socket.IO, and Monaco Editor
