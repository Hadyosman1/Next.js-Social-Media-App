import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method  GET
 * @route   ~/api/users/logout
 * @desc    logout user
 * @access  public
 */
export async function GET() {
  try {
    cookies().delete("jwt_token");
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
