"use client";

import { Tooltip } from "antd";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InfoTooltipProps {
	title: string;
	description: string;
	children?: React.ReactNode;
	iconOnly?: boolean;
}

export default function InfoTooltip({ title, description, children, iconOnly }: InfoTooltipProps) {
	const content = (
		<div className="max-w-xs">
			<p className="font-semibold text-white text-sm mb-0.5">{title}</p>
			<p className="text-white/80 text-xs leading-relaxed">{description}</p>
		</div>
	);

	if (iconOnly) {
		return (
			<Tooltip title={content} placement="top" color="#263C27">
				<InformationCircleIcon className="h-4 w-4 text-gray-300 hover:text-gray-500 transition-colors cursor-help inline-block" />
			</Tooltip>
		);
	}

	return (
		<Tooltip title={content} placement="top" color="#263C27">
			{children}
		</Tooltip>
	);
}
