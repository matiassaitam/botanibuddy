import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

async function generateArt(plantName: string) {
  const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: `A beautiful, artistic representation of a ${plantName} in a vibrant, colorful style.`,
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      samples: 1,
      steps: 30,
    }),
  })

  if (!response.ok) {
    throw new Error(`Stable Diffusion API error: ${response.statusText}`)
  }

  const result = await response.json()
  return result.artifacts[0].base64
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const image = formData.get('image') as File

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(await image.arrayBuffer()).toString('base64'),
          mimeType: image.type,
        },
      },
    ]

    const prompt = `
      Identify this plant and provide the following information:
      1. Common name
      2. Scientific name
      3. Brief description
      4. Care instructions (light, water, soil)
      5. Interesting facts

      Format the response as follows:

      Common Name: [plant name]
      Scientific Name: [scientific name]

      Description:
      [Brief description of the plant]

      Care Instructions:
      - Light: [light requirements]
      - Water: [watering instructions]
      - Soil: [soil preferences]

      Interesting Facts:
      - [Fact 1]
      - [Fact 2]
      - [Fact 3]
    `

    const result = await model.generateContent([prompt, ...imageParts])
    const response = result.response
    const text = response.text()

    // Extract the common name from the response
    const commonName = text.match(/Common Name: (.+)/)?.[1] || 'Unknown Plant'

    // Generate art based on the identified plant
    const artImage = await generateArt(commonName)

    return NextResponse.json({ result: text, artImage })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to identify plant or generate art' }, { status: 500 })
  }
}