import connectMongo from "@/libs/mongodb";
import Blog from "@/models/blog.schema";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const slug = decodeURIComponent(params.slug);
    console.log("Fetching blog with slug:", slug); // Debug log

    const blog = await Blog.findOne({ heading: slug });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog fetched successfully', blog_data: blog }, { status: 200 });

  } catch (error) {
    console.error('GET Blog Error:', error);
    return NextResponse.json({ message: 'Failed to fetch blog', error: error.message }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const slug = decodeURIComponent(params.slug);
    const { title, thumbnail, showOnFront, description, metaTitle, metaDescription } = await req.json();

    await Blog.findOneAndUpdate(
      { heading: slug },
      { heading: title, thumbnail, show_on_front: showOnFront, description, metaTitle, metaDescription },
      { new: true }
    );

    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json({ message: 'Blog updated successfully', blog_data: blogs }, { status: 200 });
  } catch (error) {
    console.log('Blog Error:', error);
    return Response.json({ message: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const slug = decodeURIComponent(params.slug);
    await Blog.findOneAndDelete({ heading: slug });
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json({ message: 'Blog deleted successfully', blog_data: blogs }, { status: 200 });
  } catch (error) {
    console.error('Blog Error:', error);
    return Response.json({ message: 'Failed to delete blog' }, { status: 500 });
  }
}
