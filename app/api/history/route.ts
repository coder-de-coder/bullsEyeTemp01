import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client = new PrismaClient();

export async function GET() {

    const data = await client.history.findMany({});
    return NextResponse.json({
        data,
    })
}
