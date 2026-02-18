"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
	const { user, loading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!isAuthenticated) {
				router.replace("/espace-personnel/connexion");
			} else if (user && !allowedRoles.includes(user.role)) {
				router.replace(`/espace-personnel/${user.role}`);
			}
		}
	}, [loading, isAuthenticated, user, allowedRoles, router]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-support">
				<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
			</div>
		);
	}

	if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
}
