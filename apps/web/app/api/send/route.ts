import { EmailTemplate } from "@repo/resend-wrapper"
import { Resend } from "@repo/resend-wrapper"
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST() {

  try {
    const data = await resend.emails.send({
      from: 'bullsEye <onboarding@resend.dev>',
      to: ['shanatic.mayank@gmail.com'],
      subject: 'First Automated mail using resend Js',
      text: `Welcome, buddy`,

    });
    if (data) {
      return NextResponse.json({ data, });
    }

  } catch (error) {
    return NextResponse.json({ error, });
  }
}