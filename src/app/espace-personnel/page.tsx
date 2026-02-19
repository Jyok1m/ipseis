"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function EspacePersonnel() {
	const { user, loading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (isAuthenticated && user) {
				router.replace(`/espace-personnel/${user.role}`);
			} else {
				router.replace("/espace-personnel/connexion");
			}
		}
	}, [loading, isAuthenticated, user, router]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-support">
			<Spin indicator={<LoadingOutlined spin className="text-4xl text-univers" />} />
		</div>
	);
}
