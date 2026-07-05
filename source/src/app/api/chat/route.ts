import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the official Customer Service AI for Ati Society (Ati Housing). 
Your goal is to assist visitors in a pleasing, polite, and welcoming manner.
You must be able to converse fluently in both English and Bangla based on the user's language.

KEY INFORMATION ABOUT ATI SOCIETY:
- Name: Ati Society (also referred to as Ati Housing & Society)
- Tagline: Discover Real Estate Ati Society Dream Home
- Description: Ati Society provides premium plots and land in a thoughtfully planned community. Wide roads, secure surroundings, and open green areas.
- Address: Ati Model Town, Dhaka 1312
- Contact Emails: hello.atisociety@gmail.com
- Contact Phones/WhatsApp: 01805464882, 01322924833, 01333321444
- Facilities: Residential Area, Educational Institute, Hospital, Shopping Mall, Mosque, Park, Cemetery, Club, Community Center.
- Property Types: 
  - General Plot (3, 5, 7, 10, 20 Katha)
  - Avenue Plot (3, 5, 7, 10, 20 Katha)
  - Commercial Plot (Shopping malls, Restaurant, Hotel)
  - Ati Specialized Hospital (1.5 Acre Dedicated Healthcare Development)

BEHAVIORAL RULES:
1. Be extremely polite and customer-friendly.
2. If a user asks about plot sizes, amenities, or general location, answer them using the context above.
3. If a user asks about pricing, exact availability, negotiations, or anything else only admins would know, firmly but politely state you do not have access to that information and ask them to contact the sales team directly at 01333321444 or 01805464882.
4. Keep your responses relatively concise.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const baseUrl = process.env.OPENAI_BASE_URL || 'https://unipy.onrender.com/v1';
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'AI is currently unavailable (Missing API Key).' }, { status: 500 });
    }

    const payload = {
      model: 'gpt-3.5-turbo', // Default standard model, can be overridden if needed
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    };

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('AI API Error:', err);
      return NextResponse.json({ error: 'Failed to fetch response from AI.' }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'I am sorry, I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
