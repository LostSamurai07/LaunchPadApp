import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface RoadmapRequest {
  userSkills: string[];
  jobPreference: string;
  currentLevel?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userSkills, jobPreference, currentLevel = 'Beginner' }: RoadmapRequest = await req.json()

    // Validate input
    if (!userSkills || !jobPreference) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userSkills and jobPreference' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Construct the prompt for OpenAI
    const prompt = `
You are an expert career advisor and curriculum designer. Create a personalized upskilling roadmap for a job seeker.

User Profile:
- Current Skills: ${userSkills.join(', ')}
- Target Job: ${jobPreference}
- Current Level: ${currentLevel}

Create a JSON object representing an upskilling roadmap with exactly 3 challenges that progress from Beginner to Expert level. The roadmap should be tailored to bridge the gap between the user's current skills and their target job.

The JSON structure must match this TypeScript interface exactly:

{
  "jobTitle": string, // The target job title
  "jobCategory": string, // Category like "Web Development", "Digital Marketing", "Graphic Design", etc.
  "totalChallenges": 3,
  "estimatedDuration": string, // e.g., "3-4 weeks"
  "challenges": [
    {
      "id": string, // unique identifier like "custom-1", "custom-2", "custom-3"
      "level": "Beginner" | "Intermediate" | "Expert",
      "title": string, // Challenge title
      "description": string, // Detailed description of what to build/create
      "deliverables": string[], // Array of specific deliverables
      "estimatedTime": string, // e.g., "1 week"
      "badgeName": string, // Name of badge to award
      "pointValue": number, // Points to award (100-300 range)
      "requiredTools": string[], // Tools/software needed
      "successCriteria": string[] // How success is measured
    }
  ]
}

Guidelines:
1. Challenge 1 should be "Beginner" level - foundational skills
2. Challenge 2 should be "Intermediate" level - building on basics
3. Challenge 3 should be "Expert" level - advanced, portfolio-worthy project
4. Each challenge should build upon the previous one
5. Point values should increase with difficulty (100, 150-200, 250-300)
6. Badge names should be motivating and relevant to the skill
7. Make challenges practical and industry-relevant
8. Consider the user's existing skills when designing challenges

Return only the JSON object, no additional text or formatting.
`

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career advisor. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      
      // Parse the error response to get more specific error details
      let errorMessage = 'Failed to generate roadmap'
      try {
        const errorJson = JSON.parse(errorData)
        if (errorJson.error && errorJson.error.message) {
          errorMessage = `OpenAI API Error: ${errorJson.error.message}`
        } else if (errorJson.error && errorJson.error.code) {
          errorMessage = `OpenAI API Error (${errorJson.error.code}): ${errorJson.error.type || 'Unknown error'}`
        }
      } catch (parseError) {
        // If we can't parse the error, include the raw response
        errorMessage = `OpenAI API Error: ${errorData}`
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    const generatedContent = data.choices[0]?.message?.content

    if (!generatedContent) {
      return new Response(
        JSON.stringify({ error: 'No content generated from OpenAI' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse the JSON response from OpenAI
    let roadmap
    try {
      roadmap = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      console.error('Raw OpenAI response:', generatedContent)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response format from AI', 
          details: `Parse error: ${parseError.message}`,
          rawResponse: generatedContent.substring(0, 500) // Include first 500 chars for debugging
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate the roadmap structure
    if (!roadmap.jobTitle || !roadmap.challenges || roadmap.challenges.length !== 3) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid roadmap structure generated',
          details: `Missing required fields. Has jobTitle: ${!!roadmap.jobTitle}, Has challenges: ${!!roadmap.challenges}, Challenge count: ${roadmap.challenges?.length || 0}`
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ roadmap }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in generate-roadmap function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})