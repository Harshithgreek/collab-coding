# Collaborative Code Editor - Features

## 🚀 Persistent File Storage

### How It Works

Every room has its own **persistent workspace** where all files and folders are automatically saved on the server. This means:

- ✅ **Automatic Saving**: Files are saved to the server when you click Save or use Ctrl+S
- ✅ **Room-Based Storage**: Each room has its own isolated workspace
- ✅ **Persistent Data**: Files remain available even after everyone leaves the room
- ✅ **Real-Time Sync**: All users in the room see file changes instantly

### File Operations

#### Creating Files

1. Click the **➕📄** button in the File Explorer
2. Enter the file name (e.g., `script.js`, `index.html`, `app.py`)
3. The file is created and visible to everyone in the room immediately

#### Creating Folders

1. Click the **➕📁** button in the File Explorer
2. Enter the folder name (e.g., `src`, `components`, `utils`)
3. Use folders to organize your code structure

#### Saving Files

- Click the **💾 Save** button in the header
- Or use keyboard shortcut: **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac)
- Files are saved to the server and synced to all users

#### Opening Files

- Click any file in the File Explorer
- The content loads automatically
- Everyone can open and edit the same files

#### Deleting Files/Folders

1. Right-click on the file or folder
2. Select "Delete" from the context menu
3. Confirm the deletion
4. The file/folder is removed for everyone

### Collaboration Features

#### Real-Time Editing

- Multiple users can edit the same file simultaneously
- Changes are synced in real-time using Operational Transformation
- See who's connected in the user panel

#### File Updates

- When another user saves a file you're viewing, you'll be notified
- Choose to reload the file to see their changes
- Prevents conflicts and lost work

#### Shared Workspace

- All room members see the same file structure
- New files/folders appear instantly for everyone
- Perfect for pair programming and team coding

## 📁 Room Workspace Structure

Each room gets its own directory on the server:

```
workspace/
  └── [room-id]/
      ├── index.js          (welcome file)
      ├── src/              (source code folder)
      ├── tests/            (test files folder)
      └── docs/             (documentation folder)
```

## 🔒 Security & Limits

- **File Size Limit**: 1MB per file
- **Allowed Extensions**: `.js`, `.jsx`, `.ts`, `.tsx`, `.py`, `.java`, `.cpp`, `.c`, `.go`, `.html`, `.css`, `.json`, `.md`, `.txt`, and more
- **Path Security**: Directory traversal is prevented
- **Room Isolation**: Each room's files are completely separate

## 💡 Tips

1. **Organize Your Code**: Use folders (`src/`, `components/`, `utils/`) to keep files organized
2. **Save Frequently**: Use Ctrl+S to save your work
3. **Refresh When Needed**: Click the 🔄 button to reload the file tree if you don't see updates
4. **Share the Room Link**: Copy the room link to invite collaborators
5. **Files Persist**: You can leave and rejoin the room - your files will still be there!

## 🎯 Use Cases

- **Pair Programming**: Work together on code in real-time
- **Code Reviews**: Share files and discuss changes live
- **Team Projects**: Organize shared code with folders and files
- **Learning**: Teachers can share code files with students
- **Interviews**: Conduct live coding interviews with file persistence

## 🔧 Future Enhancements

Coming soon:

- File upload from local computer
- Download workspace as ZIP
- File history and version control
- File search functionality
- File renaming capability
