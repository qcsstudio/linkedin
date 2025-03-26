import connectDB from "@/libs/mongodb";
import SchedulePost from "@/models/post.schema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
    try {
        await connectDB();

        // ✅ Fix: Await cookies before using
        const cookieStore = await cookies();
        const user_id = cookieStore.get("user_id")?.value;

        if (!user_id) {
            return NextResponse.json({ message: "Unauthorized: user_id is missing in cookies" }, { status: 401 });
        }

        // Parse request body
        const body = await req.json();
        const { postCaption, privacy, formImage, selectedAccount  } = body;

        // ✅ Fix: Ensure missing fields in formImage are handled
        const formattedImages = formImage.map((img) => ({
            imageFile: img.imageFile || "",
            type: img.type || "",
            size: img.size || 0,
            lastModifiedDate: img.lastModifiedDate || new Date(),
            lastModified: img.lastModified || Date.now(),
            name: img.name || "unknown",
        }));

        const newPost = new SchedulePost({
            userId: user_id,
            postCaption,
            privacy,
            formImage: formattedImages, // Ensures required fields exist
            selectedAccount,
        });

        await newPost.save();

        return NextResponse.json({ message: "Post Created!", postData: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Unable to create post!" }, { status: 500 });
    }
};
