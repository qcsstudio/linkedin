// ✅ Next.js 14 App Router example
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
    try {

        const body = await req.json()
        const { accessToken, organizationId } = body

        console.log("organizationId", organizationId);
        console.log("accessToken", accessToken);

        const linkedInResponse = await fetch(
           `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${organizationId}&count=10&start=0`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        if (!linkedInResponse.ok) {
            return NextResponse.json({ error: 'Failed to fetch LinkedIn posts' }, { status: 500 });
        }

        const postsData = await linkedInResponse.json();
        const posts = postsData.elements;
        console.log("posts", posts);
        // Step 2️⃣: Prepare content for OpenAI prompt
        const textList = posts
            .map(post => post?.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text)
            .filter(Boolean);

        const prompt = `
Here are my last 10 LinkedIn posts:

${textList.join("\n\n")}

Based on these, suggest 5 unique content topics I should consider posting next on LinkedIn to maximize engagement and reach.
`;

        // Step 3️⃣: Call OpenAI API
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: 'system', content: 'You are an expert LinkedIn content strategist.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        });

        const suggestions = aiResponse.choices[0].message.content;

        // Step 4️⃣: Return suggestions
        return NextResponse.json({ suggestions });

    } catch (error) {
        console.error('Error in LinkedIn + OpenAI flow:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
