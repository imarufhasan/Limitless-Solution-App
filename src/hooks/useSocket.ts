import { useAppSelector } from "@/redux/hooks";
import { getSocket, initSocket } from "@/socket/socket";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

export function useSocket() {
  const token = useAppSelector((state) => state.auth.token);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = initSocket(token);

    if (!socketRef.current.connected) {
      socketRef.current.connect();
    }
  }, [token]);

  return getSocket;
}