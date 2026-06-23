class SafeStorage {
  private memoryStorage: Record<string, string> = {};

  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return this.memoryStorage[key] || null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      this.memoryStorage[key] = value;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete this.memoryStorage[key];
    }
  }
}

export const safeStorage = new SafeStorage();
