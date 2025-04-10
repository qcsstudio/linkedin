import connectMongo from "@/libs/mongodb";
import Blog from "@/models/blog.schema";

export async function GET() {
  try {
    await connectMongo();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json({ message: 'Blogs fetched successfully', blog_data: blogs }, { status: 200 });
  } catch (error) {
    console.error('Blog Error:', error);
    return Response.json({ message: 'Failed to fetch blogs' }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectMongo();
    const { title, thumbnail, showOnFront, description, metaTitle, metaDescription } = await req.json();

    console.log("API received:", { title, thumbnail, showOnFront, description, metaTitle, metaDescription }); 

    const newBlog = new Blog({
      heading: title,
      thumbnail,
      show_on_front: showOnFront,
      description,
      metaTitle,
      metaDescription
    });

    await newBlog.save();

    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json({ message: 'Blog posted successfully', blog_data: blogs }, { status: 200 });
  } catch (error) {
    console.error('Post Blog Error:', error);
    return Response.json({ message: 'Failed to post blog' }, { status: 500 });
  }
}

