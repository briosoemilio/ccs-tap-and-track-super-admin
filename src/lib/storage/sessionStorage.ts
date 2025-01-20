export type StorageKeys = "session";

export type Session = {
  token: string;
};

const SessionStorage = {
  getSession() {
    try {
      const value = sessionStorage.getItem("session");
      return value !== null ? (JSON.parse(value) as Session) : null;
    } catch (error) {
      console.log("Error getting Session data:", error);
      return null;
    }
  },

  setSession(value: unknown) {
    try {
      sessionStorage.setItem("session", JSON.stringify(value));
    } catch (error) {
      console.log("Error setting Session data:", error);
    }
  },

  removeSession() {
    try {
      sessionStorage.removeItem("session");
    } catch (error) {
      console.log("Error removing Session data:", error);
    }
  },
};

export default SessionStorage;
