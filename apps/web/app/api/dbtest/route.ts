import { PrismaClient } from "@repo/db"
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  try {
    const userData = await client.user.findMany({});
    const userNames = userData.map(user => user.name);

    return NextResponse.json({
      names: userNames,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      error: 'An error occurred while fetching user data.',
      e: e, // Return the error details in the response for debugging
    });
  } finally {
    await client.$disconnect();
  }
};
