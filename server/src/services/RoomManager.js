/**
 * Room Manager - Handles room creation, user management, and document state
 */
class RoomManager {
  constructor() {
    this.rooms = new Map();
    this.userRoomMap = new Map(); // Track which rooms each user is in
  }

  /**
   * Join or create a room
   */
  joinRoom(roomId, userId, userName) {
    // Create room if it doesn't exist
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        content: '// Welcome to the collaborative code editor!\n// Start coding together...\n',
        language: 'javascript',
        users: new Map(),
        version: 0,
        operations: [], // Store operations for conflict resolution
        createdAt: Date.now(),
        lastActivity: Date.now()
      });
    }

    const room = this.rooms.get(roomId);
    
    // Add user to room
    room.users.set(userId, {
      id: userId,
      name: userName,
      joinedAt: Date.now(),
      color: this.generateUserColor(userId)
    });
    
    // Track user's rooms
    if (!this.userRoomMap.has(userId)) {
      this.userRoomMap.set(userId, new Set());
    }
    this.userRoomMap.get(userId).add(roomId);
    
    room.lastActivity = Date.now();
    
    return room;
  }

  /**
   * Leave a room
   */
  leaveRoom(roomId, userId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    room.users.delete(userId);
    
    // Remove from user room map
    if (this.userRoomMap.has(userId)) {
      this.userRoomMap.get(userId).delete(roomId);
      if (this.userRoomMap.get(userId).size === 0) {
        this.userRoomMap.delete(userId);
      }
    }

    // Delete empty rooms after 5 minutes of inactivity
    if (room.users.size === 0) {
      setTimeout(() => {
        const currentRoom = this.rooms.get(roomId);
        if (currentRoom && currentRoom.users.size === 0) {
          this.rooms.delete(roomId);
          console.log(`Room ${roomId} deleted due to inactivity`);
        }
      }, 5 * 60 * 1000);
    }

    return room;
  }

  /**
   * Get room by ID
   */
  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  /**
   * Get all rooms for a user
   */
  getUserRooms(userId) {
    return this.userRoomMap.get(userId) || new Set();
  }

  /**
   * Transform operation for conflict resolution
   */
  transformOperation(roomId, operation, version) {
    const room = this.rooms.get(roomId);
    if (!room) return operation;

    // Get operations that happened after this version
    const missedOps = room.operations.slice(version);
    
    let transformedOp = operation;
    for (const missedOp of missedOps) {
      transformedOp = this.transformTwoOperations(transformedOp, missedOp);
    }

    return transformedOp;
  }

  /**
   * Simple operational transformation for two operations
   */
  transformTwoOperations(op1, op2) {
    // If operations don't conflict, return original
    if (op1.rangeOffset + op1.rangeLength <= op2.rangeOffset) {
      return op1;
    }
    
    if (op2.rangeOffset + op2.rangeLength <= op1.rangeOffset) {
      // Adjust offset based on op2's changes
      return {
        ...op1,
        rangeOffset: op1.rangeOffset + (op2.text.length - op2.rangeLength)
      };
    }

    // Operations overlap - use op2's position
    return {
      ...op1,
      rangeOffset: op2.rangeOffset + op2.text.length
    };
  }

  /**
   * Generate consistent color for user
   */
  generateUserColor(userId) {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    
    // Use hash of userId to pick color
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * Get statistics
   */
  getRoomCount() {
    return this.rooms.size;
  }

  getTotalUsers() {
    let total = 0;
    this.rooms.forEach(room => {
      total += room.users.size;
    });
    return total;
  }

  /**
   * Clean up inactive rooms (call periodically)
   */
  cleanupInactiveRooms(maxInactivityMs = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    const roomsToDelete = [];

    this.rooms.forEach((room, roomId) => {
      if (room.users.size === 0 && (now - room.lastActivity) > maxInactivityMs) {
        roomsToDelete.push(roomId);
      }
    });

    roomsToDelete.forEach(roomId => {
      this.rooms.delete(roomId);
      console.log(`Cleaned up inactive room: ${roomId}`);
    });

    return roomsToDelete.length;
  }
}

export default RoomManager;
