import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  try {
    await ConnectDB();
    const data = await req.json();
    const { _id, platformName, accessToken , name , uniqueId } = data;

    if (!_id || !platformName || !accessToken) {
      return NextResponse.json(
        {
          message: "Missing required fields: _id, platformName, or accessToken",
        },
        { status: 400 }
      );
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
            accessToken,
            name,
            uniqueId
          },
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "User successfully updated with new platform", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("User edit error:", error);
    return NextResponse.json(
      { message: "User update failed", error: error.message },
      { status: 500 }
    );
  }
};

export async function GET(req,{params}){
  try {
    await ConnectDB();
      const slugData = await params?.slug;
      const user = await User.findOne({_id:slugData});
      return Response.json({ message: 'Blog Data get successfully', user_data: user } , {status:200});

  } catch (error) {
      console.log('Blog Error Server:', error);
      return  Response.json({ message: 'Blog not get Error' } , {status:500});
  }
}