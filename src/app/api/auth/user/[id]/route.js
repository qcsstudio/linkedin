import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { NextResponse } from 'next/server';

export const PATCH = async (req) => {
  try {
    // Connect to MongoDB
    await ConnectDB();

    // Parse the incoming request body
    const data = await req.json();
    
    // Extract the user ID and platform data from the request
    const { _id, platformName, accessToken } = data;

    // Validate the required fields
    if (!_id || !platformName || !accessToken) {
      return NextResponse.json({ message: "Missing required fields: _id, platformName, or accessToken" }, { status: 400 });
    }

    // Find the user by _id
    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Add a new platform object to the platforms array
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          platforms: {
            platformName, 
            accessToken
          }
        }
      },
      { new: true }  // Return the updated document
    );

    // Return the updated user
    return NextResponse.json({ message: "User successfully updated with new platform", updatedUser }, { status: 200 });

  } catch (error) {
    console.error("User edit error:", error);
    return NextResponse.json({ message: "User update failed", error: error.message }, { status: 500 });
  }
}
