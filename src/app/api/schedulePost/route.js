import connectDB from "@/libs/mongodb";
import Post from "@/models/post.schema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
    try {
        await connectDB();
        const  body = await req.json();
        const { user_id , postDescription , privacy , formImage , selectedAccount } = body;
        const newPost = new Post({
            userId:user_id,
            postDescription:postDescription,
            privacy: privacy,
            formImage: formImage, // Array of file objects
            selectedAccount: selectedAccount, // Array of accounts
        });

        await newPost.save();

        return NextResponse.json({ message: "Post Created!", postData: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Unable to create post!" }, { status: 500 });
    }
};
