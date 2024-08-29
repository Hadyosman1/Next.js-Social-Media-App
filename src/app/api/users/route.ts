import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  GET
 * @route   ~/api/users
 * @desc    Get All Users
 * @access  public
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
