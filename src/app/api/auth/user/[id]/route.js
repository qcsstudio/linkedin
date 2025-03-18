import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { NextResponse } from 'next/server';

export const PATCH = async (req) => {
  try {
    await ConnectDB();
    const data = await req.json();
    const { _id, platformName, accessToken } = data;

    if (!_id || !platformName || !accessToken) {
      return NextResponse.json({ message: "Missing required fields: _id, platformName, or accessToken" }, { status: 400 });
    }
    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

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
      { new: true }  
    );

    return NextResponse.json({ message: "User successfully updated with new platform", updatedUser }, { status: 200 });

  } catch (error) {
    console.error("User edit error:", error);
    return NextResponse.json({ message: "User update failed", error: error.message }, { status: 500 });
  }
}
