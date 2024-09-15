/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method  GET
 * @route   ~/api/users
 * @desc    Get All Users
 * @access  public
 */
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        isAdmin: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
