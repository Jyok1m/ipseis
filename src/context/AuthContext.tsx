"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getMe, login as loginApi, logout as logoutApi } from "@/lib/authApi";
import { useRouter } from "next/navigation";

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: "administrateur" | "apprenant" | "professionnel";
	phone: string;
	company: string;
	position: string;
	address: string;
	isActive: boolean;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<User>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const refreshUser = useCallback(async () => {
		try {
			const response = await getMe();
			setUser(response.data.user);
		} catch {
			setUser(null);
		}
	}, []);

	useEffect(() => {
		(async () => {
			await refreshUser();
			setLoading(false);
		})();
	}, [refreshUser]);

	const login = async (email: string, password: string): Promise<User> => {
		const response = await loginApi(email, password);
		const loggedUser = response.data.user;
		setUser(loggedUser);
		return loggedUser;
	};

	const logout = async () => {
		await logoutApi();
		setUser(null);
		router.push("/");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				isAuthenticated: !!user,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
