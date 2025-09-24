import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function TrainingSkeleton() {
	return (
		<div className="bg-support px-6 pt-8 lg:px-8 text-sm sm:text-base text-pretty min-h-full">
			<div className="col-start-2 row-start-2 flex justify-center items-center w-full min-h-[400px]">
				<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
			</div>
		</div>
	);
}
