import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _: Request, 
  { params }: { params: { user_name: string } }
) {
  const filePath = path.join(process.cwd(), "src/data/users.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(fileContents);
  const {user_name} = await params;

  const user = users[user_name];
  
  console.log("User:", user);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}