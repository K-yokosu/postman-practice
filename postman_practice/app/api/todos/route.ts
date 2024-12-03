import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const result = await authCheck(request);
    if(result?.status === 401) return result;

    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if(id){
    const todo = await prisma.todos.findUnique({ where: { id } });
    return NextResponse.json({ todo });
    } else{
    const todos = await prisma.todos.findMany();
    return NextResponse.json( todos )
    }
}

export async function POST(request: Request) {
    const result = await authCheck(request);
    if(result?.status === 401) return result;

    const req = await request.json();
    const todo = await prisma.todos.create({
        data: {
            title: req.title,
            content: req.content
        }
    });
    return NextResponse.json({ todo });
}

export async function PATCH(request: Request) {
    const result = await authCheck(request);
    if(result?.status === 401) return result;

    const req = await request.json();
    const todo = await prisma.todos.update({
        where: {
            id: req.id
        },
        data: {
            title: req.title,
            content: req.content
        }
    });
    return NextResponse.json({ todo });
}

export async function DELETE(request: Request) {
    const result = await authCheck(request);
    if(result?.status === 401) return result;
    
    const req = await request.json();
    const todo = await prisma.todos.delete({
        where: {
            id: req.id
        }
    });
    return NextResponse.json({ todo });
}


export async function authCheck(request: Request) {
  // リクエストヘッダーを取得
  const clientApiKey = request.headers.get('x-api-key');

  // 認証処理
  if (!clientApiKey || clientApiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API key" },
      { status: 401 }
    );
  }
  return;
}
  