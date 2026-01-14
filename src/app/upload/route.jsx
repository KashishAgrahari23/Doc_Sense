import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔴 IMPORTANT

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to Buffer (Node.js)
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log("File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
      bufferSize: buffer.length,
    });

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
