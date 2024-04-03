import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest,{ params }: { params: { email: string } }) {
    const body = await request.json()
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/users/${params.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json();
    return NextResponse.json(data)
  
  }

  export async function DELETE(request: NextRequest,{ params }: { params: { email: string } }) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/users/${params.email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json();
    return NextResponse.json(data)
  
  }