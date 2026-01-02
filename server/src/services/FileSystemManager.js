import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * File System Manager
 * Manages file and folder operations for collaborative editing
 */
class FileSystemManager {
  constructor() {
    this.workspaceRoot = path.join(__dirname, '../../workspace');
    this.maxFileSize = 1024 * 1024; // 1MB
    this.allowedExtensions = [
      '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.go',
      '.html', '.css', '.json', '.md', '.txt', '.yml', '.yaml', '.xml',
      '.sh', '.bat', '.sql', '.rs', '.rb', '.php', '.vue', '.svelte'
    ];
    this.ensureWorkspace();
  }

  /**
   * Get room-specific workspace path
   */
  getRoomWorkspace(roomId) {
    return path.join(this.workspaceRoot, roomId);
  }

  async ensureWorkspace() {
    try {
      await fs.access(this.workspaceRoot);
    } catch {
      await fs.mkdir(this.workspaceRoot, { recursive: true });
    }
  }

  /**
   * Ensure room workspace exists
   */
  async ensureRoomWorkspace(roomId) {
    const roomWorkspace = this.getRoomWorkspace(roomId);
    try {
      await fs.access(roomWorkspace);
    } catch {
      await fs.mkdir(roomWorkspace, { recursive: true });
      await this.createDefaultStructure(roomId);
    }
  }

  async createDefaultStructure(roomId) {
    const roomWorkspace = this.getRoomWorkspace(roomId);
    const defaultFolders = ['src', 'tests', 'docs'];
    for (const folder of defaultFolders) {
      await fs.mkdir(path.join(roomWorkspace, folder), { recursive: true });
    }
    
    // Create a welcome file
    const welcomeContent = `// Welcome to Collaborative Code Editor!
// Room: ${roomId}
// Start coding together in real-time
// All files are saved automatically and shared with everyone in this room

console.log("Hello, World!");
`;
    await fs.writeFile(
      path.join(roomWorkspace, 'index.js'),
      welcomeContent
    );
  }

  /**
   * Get workspace structure for a room
   */
  async getFileTree(roomId, relativePath = '') {
    try {
      await this.ensureRoomWorkspace(roomId);
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      const items = await fs.readdir(fullPath, { withFileTypes: true });

      const tree = [];

      for (const item of items) {
        const itemPath = path.join(relativePath, item.name);
        
        if (item.isDirectory()) {
          tree.push({
            name: item.name,
            type: 'directory',
            path: itemPath,
            children: []
          });
        } else if (item.isFile()) {
          const ext = path.extname(item.name);
          if (this.allowedExtensions.includes(ext) || ext === '') {
            const stats = await fs.stat(path.join(fullPath, item.name));
            tree.push({
              name: item.name,
              type: 'file',
              path: itemPath,
              size: stats.size,
              extension: ext
            });
          }
        }
      }

      // Sort: directories first, then files alphabetically
      tree.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
      });

      return tree;
    } catch (error) {
      console.error('Error reading file tree:', error);
      return [];
    }
  }

  /**
   * Read file content from room workspace
   */
  async readFile(roomId, relativePath) {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      const ext = path.extname(fullPath);

      if (!this.allowedExtensions.includes(ext) && ext !== '') {
        throw new Error('File type not allowed');
      }

      const stats = await fs.stat(fullPath);
      if (stats.size > this.maxFileSize) {
        throw new Error('File too large');
      }

      const content = await fs.readFile(fullPath, 'utf-8');
      return {
        success: true,
        content,
        path: relativePath,
        size: stats.size
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Write file content to room workspace
   */
  async writeFile(roomId, relativePath, content) {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      const ext = path.extname(fullPath);

      if (!this.allowedExtensions.includes(ext) && ext !== '') {
        throw new Error('File type not allowed');
      }

      // Ensure directory exists
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');

      return {
        success: true,
        path: relativePath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Create new file in room workspace
   */
  async createFile(roomId, relativePath, content = '') {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      
      // Check if file already exists
      try {
        await fs.access(fullPath);
        throw new Error('File already exists');
      } catch (err) {
        if (err.message === 'File already exists') throw err;
      }

      const ext = path.extname(fullPath);
      if (!this.allowedExtensions.includes(ext) && ext !== '') {
        throw new Error('File type not allowed');
      }

      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');

      return {
        success: true,
        path: relativePath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Create new directory in room workspace
   */
  async createDirectory(roomId, relativePath) {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      await fs.mkdir(fullPath, { recursive: true });

      return {
        success: true,
        path: relativePath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Delete file or directory from room workspace
   */
  async delete(roomId, relativePath) {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullPath = path.join(roomWorkspace, relativePath);
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        await fs.rm(fullPath, { recursive: true });
      } else {
        await fs.unlink(fullPath);
      }

      return {
        success: true,
        path: relativePath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Rename file or directory in room workspace
   */
  async rename(roomId, oldPath, newPath) {
    try {
      const roomWorkspace = this.getRoomWorkspace(roomId);
      const fullOldPath = path.join(roomWorkspace, oldPath);
      const fullNewPath = path.join(roomWorkspace, newPath);

      await fs.rename(fullOldPath, fullNewPath);

      return {
        success: true,
        oldPath,
        newPath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate path (prevent directory traversal)
   */
  isValidPath(roomId, relativePath) {
    const roomWorkspace = this.getRoomWorkspace(roomId);
    const fullPath = path.join(roomWorkspace, relativePath);
    return fullPath.startsWith(roomWorkspace);
  }
}

export default FileSystemManager;
