import { PDFDocument, rgb } from "pdf-lib";

function hexToRgb(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	return rgb(r, g, b);
}

export async function addWatermarkToPdf(
	pdfBytes: ArrayBuffer,
	watermark: { text: string; color: string }
): Promise<Uint8Array> {
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const pages = pdfDoc.getPages();
	const color = hexToRgb(watermark.color);

	for (const page of pages) {
		const { width, height } = page.getSize();
		const fontSize = Math.min(width, height) * 0.07;
		const textWidth = watermark.text.length * fontSize * 0.45;
		const centerX = width / 2;
		const centerY = height / 2;
		const angle = (-30 * Math.PI) / 180;

		page.drawText(watermark.text, {
			x: centerX - (textWidth / 2) * Math.cos(angle),
			y: centerY + (textWidth / 2) * Math.sin(angle),
			size: fontSize,
			color,
			opacity: 0.15,
			rotate: { type: "degrees" as const, angle: -30 },
		});
	}

	return pdfDoc.save();
}
