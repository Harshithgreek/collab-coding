# Persistence & Error Handling Plan

## 1. Server-Side Persistence (Data Storage)

- [ ] **Create Data Directory**: Ensure a dedicated `data/` or `storage/` directory exists to store room data permanently.
- [ ] **Implement Persistence Manager**: Create a system to save room state (ID, content, language, created/active timestamps) to disk (e.g., `rooms.json` or individual JSON files per room).
- [ ] **Save on Change**: Update `RoomManager` to save room state specifically when:
  - A room is created.
  - Code is modified (debounced to avoid excessive writes).
  - Language is changed.
- [ ] **Load on Startup/Join**: Modify `RoomManager` to:
  - Load all saved rooms into memory when the server starts.
  - OR lazy-load a room from disk when a user tries to join it if it's not currently active in memory.

## 2. File System Persistence

- [ ] **Persist Virtual Files**: If the application supports multiple files per room (via `FileSystemManager`), ensure the file structure and contents for each room are also serialized and saved to disk.
- [ ] **Restore Files**: Ensure that when a room is loaded, its associated file tree is also correctly restored.

## 3. Client-Side Error Handling (Login Page)

- [ ] **Refine Room Validation**:
  - Instead of just alerting _after_ a socket event, strictly validate the room ID existence via a dedicated API call (HTTP `GET /api/rooms/:id` or `POST /api/validate-room`) _before_ attempting the socket connection.
  - This allows showing an inline error message (e.g., "Room not found") directly on the form input field, preventing the "logging in" state/transition entirely for invalid rooms.
- [ ] **UI Feedback**: Update `RoomSelector` to display these validation errors visually (red border/text) instead of using browser `alert()` popups.

## 4. Session/State Management

- [ ] **Room Cleanup Policy**: Update the cleanup logic (`cleanupInactiveRooms`) to maybe _unload_ rooms from memory but keep them on disk, rather than deleting them permanently, ensuring work is never lost.
- [ ] **Delete Policy**: Implement a specific "Delete Room" feature if users actually want to remove data permanently.
