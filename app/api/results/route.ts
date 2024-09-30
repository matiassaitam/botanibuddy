import { NextResponse } from 'next/server'

let lastResult: { result: string, artImage: string } | null = null

export async function GET() {
  if (lastResult) {
    return NextResponse.json(lastResult)
  } else {
    return NextResponse.json({ error: 'No results available' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  const { result, artImage } = await request.json()
  lastResult = { result, artImage }
  return NextResponse.json({ success: true })
}