import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import todo from "@/app/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const todoResult = await Todo.find({});
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
    });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data);

  const newTodo = new todo(data)
  const new_todo = await newTodo.save();

  console.log(new_todo);

  return NextResponse.json({
    status: 200,
    message: "Added Success",
    data: new_todo
  })
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const todo = await Todo.findByIdAndDelete(data.id);

  return NextResponse.json({
    status: 200,
    message: "Delete Success",
    data: todo
  })
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const todo = await Todo.findByIdAndUpdate(data.id, {
    status: !data.status
  }, { new: true });

  return NextResponse.json({
    status: 200,
    message: "Delete Success",
    data: todo
  })
}