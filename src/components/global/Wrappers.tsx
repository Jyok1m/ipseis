import React from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-7xl min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-3xl">{children}</div>
		</div>
	);
}

export function SectionWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-7xl p-6 lg:p-8">
			<div className="mx-auto max-w-3xl">{children}</div>
		</div>
	);
}
