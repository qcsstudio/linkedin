import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Securely load API key
  });

export const POST = async(req)=>{

    try {
        const data = await req.json();

        const {prompt} = data;

        const response = await openai.chat.completions.create({
            model:"gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100
        });

        console.log(response);

        return Response.json({message:"Create the response Successfully",data:response},{status:200});

    } catch (error) {
        console.log("Unable to generate response :",error);
        return Response.json({message:"Server Error unbale to generate response",error:error},{status:500})
    }

}