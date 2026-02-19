"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { getUnreadCount, getContactUnreadCount } from "@/lib/authApi";

interface SocketContextType {
	socket: Socket | null;
	unreadCount: number;
	contactUnreadCount: number;
	refreshContactUnreadCount: () => void;
}

const SocketContext = createContext<SocketContextType>({ socket: null, unreadCount: 0, contactUnreadCount: 0, refreshContactUnreadCount: () => {} });

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, user } = useAuth();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [unreadCount, setUnreadCount] = useState(0);
	const [contactUnreadCount, setContactUnreadCount] = useState(0);
	const socketRef = useRef<Socket | null>(null);

	// Fetch initial unread count via REST
	useEffect(() => {
		if (!isAuthenticated) return;
		getUnreadCount()
			.then((res) => setUnreadCount(res.data.count))
			.catch(() => {});
	}, [isAuthenticated]);

	// Fetch contact unread count for admins
	const refreshContactUnreadCount = useCallback(() => {
		if (!isAuthenticated || !user || user.role !== "administrateur") return;
		getContactUnreadCount()
			.then((res) => setContactUnreadCount(res.data.count))
			.catch(() => {});
	}, [isAuthenticated, user]);

	useEffect(() => {
		refreshContactUnreadCount();
	}, [refreshContactUnreadCount]);

	// Connect socket when authenticated
	useEffect(() => {
		if (!isAuthenticated || !user) {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
				setSocket(null);
			}
			return;
		}

		const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3098";
		const newSocket = io(backendUrl, {
			withCredentials: true,
			transports: ["websocket", "polling"],
		});

		newSocket.on("unread-count", (data: { count: number }) => {
			setUnreadCount(data.count);
		});

		socketRef.current = newSocket;
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			socketRef.current = null;
			setSocket(null);
		};
	}, [isAuthenticated, user]);

	return <SocketContext.Provider value={{ socket, unreadCount, contactUnreadCount, refreshContactUnreadCount }}>{children}</SocketContext.Provider>;
}

export function useSocket() {
	return useContext(SocketContext);
}
