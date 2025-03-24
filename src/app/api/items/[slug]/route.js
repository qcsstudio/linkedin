export async function GET(request, { params }) {
    const { slug } = await params 
    return Response.json( { data: slug})
  }
  