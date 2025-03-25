import Post from "@/models/post.schema";
import connectDB from "@/libs/mongodb";

export const POST = async (req) => {
    try {
        await connectDB(); // Connect to database first
        
        const body = await req.json();
        const { title, accounts, media, caption, start, end, privacy, hashtags, location } = body;
    
        // You'll need proper authentication middleware for req.user
        const post = new Post({
          user: req.user?.id, // Optional chaining in case user doesn't exist
          title,
          accounts,
          media,
          caption,
          hashtags,
          location,
          start: new Date(start),
          end: end ? new Date(end) : null,
          privacy: privacy || 'public',
          status: 'draft'
        });
    
        await post.save();
    
        return new Response(JSON.stringify({
          success: true,
          data: post
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          }
        });

    } catch(err) {
        return new Response(JSON.stringify({ 
            success: false,
            message: err.message 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }
}