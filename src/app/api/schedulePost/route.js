import connectDB from "@/libs/mongodb";
import SchedulePost from "@/models/post.schema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async ()=>{
   try{
    await connectDB();
    const cookieStore = cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch posts from MongoDB
    const posts = await SchedulePost.find({ userId: user_id });

    return NextResponse.json({ posts }, { status: 200 });
} catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
}
};

export const POST = async (req) => {
    try {
        await connectDB();

        // ✅ Get user_id from cookies
        const cookieStore = cookies();
        const user_id = cookieStore.get("user_id")?.value;

        if (!user_id) {
            return NextResponse.json({ message: "Unauthorized: user_id is missing in cookies" }, { status: 401 });
        }

        // Parse request body
        const body = await req.json();
        const { postCaption, privacy, formImage, selectedAccount , scheduled } = body;

        // ✅ Ensure image fields are properly formatted
        const formattedImages = formImage?.map((img) => ({
            imageFile: img.imageFile || "",
            type: img.type || "",
            size: img.size || 0,
            lastModifiedDate: img.lastModifiedDate || new Date(),
            lastModified: img.lastModified || Date.now(),
            name: img.name || "unknown",
        })) || [];

        // ✅ Create new post with userId (no full user object needed)
        const newPost = new SchedulePost({
            userId: user_id, // Only storing user ID
            postCaption,
            privacy,
            formImage: formattedImages,
            selectedAccount,
            scheduled,
        });

        await newPost.save();

        return NextResponse.json({ message: "Post Created!", postData: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Unable to create post!" }, { status: 500 });
    }
};
