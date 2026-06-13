import { v2 as cloudinary } from "cloudinary";
export const runtime = 'edge';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type and size server-side
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "File too large" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Generate a custom filename (optional)
    const timestamp = Date.now();
    const originalName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    const customFilename = `${originalName}-${timestamp}`;

    // Upload to Cloudinary with signed request
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder || "uploads",
      resource_type: "image",
      public_id: customFilename, // Set custom filename
      // unique_filename: false, // Set to false if you want exact public_id
      // overwrite: true, // Set to true to overwrite existing files with same public_id
    });

    return Response.json({
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    const publicId = formData.get("publicId") as string; // The public_id of the image to replace

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (!publicId) {
      return Response.json({ error: "No public_id provided" }, { status: 400 });
    }

    // Validate file type and size server-side
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "File too large" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary with overwrite enabled
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder || "uploads",
      resource_type: "image",
      public_id: publicId,
      overwrite: true, // Replace existing file
      invalidate: true, // Invalidate CDN cache
    });

    return Response.json({
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Update error:", error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return Response.json({ error: "No public_id provided" }, { status: 400 });
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true, // Invalidate CDN cache
    });

    if (result.result === "ok") {
      return Response.json({
        success: true,
        message: "Image deleted successfully",
      });
    } else if (result.result === "not found") {
      return Response.json({ error: "Image not found" }, { status: 404 });
    } else {
      return Response.json(
        { error: "Failed to delete image" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
