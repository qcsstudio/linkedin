import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { generateToken } from "@/utils/tokenGenerator";

export const POST = async (req) => {
  try {
    await connectDB();
    const data = await req.json();

    const { email } = data;

    // Empty Field Check
    if (!email || !data.password) {
      return NextResponse.json(
        { message: "All Fields Required" },
        { status: 400 }
      );
    }


    // User Check
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return NextResponse.json(
        { message: "User Not Register !" },
        { status: 404 }
      );
    }

    // Password Match
    const passwordMatch = await bcrypt.compare(
      data.password,
      userExist.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect credential" },
        { status: 409 }
      );
    }


    const userId = userExist._id;

    // Jwt Create
    const token = await generateToken({ userId });

    if (!token) {
      return NextResponse.json(
        { message: "Server Not Able To Generate Token" },
        { status: 500 }
      );
    }

    const cookie = serialize("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    const UserIdCookie = serialize("user_id", userId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

    // sending response
    const { password, ...userData } = userExist._doc;

    const response = NextResponse.json(
      { message: "User Logined In Successfully", data: userData },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", [cookie , UserIdCookie]) ;

    return response;
  } catch (error) {
    console.errror("User Login Error");
    return NextResponse.json({ message: "User Login Failed" }, { status: 500 });
  }
};
