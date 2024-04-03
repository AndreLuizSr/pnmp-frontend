import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    return NextResponse.json({ result })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json();
    return NextResponse.json(data)
  
  }
