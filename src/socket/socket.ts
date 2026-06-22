import { io, Socket } from "socket.io-client";

const baseUrl = "http://10.10.28.73:5000";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function initSocket(token: string): Socket {
  if (socket?.connected) return socket;

  // ✅ disconnect করে নতুন socket বানাও
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(baseUrl, {
    auth: { token },          // ✅ query এর বদলে auth use করো (more secure)
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    autoConnect: true,
  });

  socket.on("connect", () => console.log("[Socket] ✅ connected:", socket?.id));
  socket.on("disconnect", (r) => console.warn("[Socket] ❌ disconnected:", r));
  socket.on("connect_error", (e) => console.error("[Socket] error:", e.message));

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}