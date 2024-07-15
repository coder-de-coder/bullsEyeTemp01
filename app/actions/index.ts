"use server";
import { PrismaClient } from "@prisma/client";
import { sendEmail, generateEmailBody } from "../lib/nodemailer/index";

const client = new PrismaClient();

type SendOtpResponse =
  | { success: true; otp: number }
  | { success: false; message: string | undefined };

type VerifyOtpResponse =
  | { success: true; userId?: number; message?: string }
  | { success: false; message: string };

type SubscribeUserResponse =
  | { success: true; message: string }
  | { success: false; message: string };

export async function generateAndSendOtp(
  email: string,
  type: "SUBSCRIBE" | "UNSUBSCRIBE"
): Promise<SendOtpResponse> {
  const otp = Math.floor(100000 + Math.random() * 900000);

  await client.oTP.create({
    data: { email, otp, expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
  });

  const { subject, body } = generateEmailBody(type, otp);
  const emailResponse = await sendEmail(email, subject, body, otp);

  if (!emailResponse.success) {
    return { success: false, message: emailResponse.message };
  }

  return { success: true, otp };
}

export async function sendOtp(
  email: string,
  firstName: string
): Promise<SendOtpResponse> {
  const foundUser = await client.user.findUnique({
    where: { email },
  });

  if (foundUser) {
    return { success: false, message: "User Already Exists" };
  }

  return generateAndSendOtp(email, "SUBSCRIBE");
}

export async function verifyOtp(
  email: string,
  otp: string,
  type: "SUBSCRIBE" | "UNSUBSCRIBE"
): Promise<VerifyOtpResponse> {
  const foundOtp = await client.oTP.findFirst({
    where: { email, otp: parseInt(otp, 10) },
  });

  if (!foundOtp || foundOtp.expiresAt < new Date()) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  await client.oTP.delete({ where: { otp: parseInt(otp, 10) } });

  if (type === "SUBSCRIBE") {
    const newUser = await client.user.create({
      data: { email, name: email },
    });
    return { success: true, userId: newUser.id };
  } else {
    await client.user.delete({ where: { email } });
    return { success: true, message: "Successfully unsubscribed" };
  }
}

export async function subscribeUser(
  userId: number,
  firstName: string,
  email: string
): Promise<SubscribeUserResponse> {
  try {
    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await client.user.update({
      where: { id: userId },
      data: { name: firstName, email },
    });

    return { success: true, message: "User subscribed successfully" };
  } catch (error) {
    console.error("Error subscribing user:", error);
    return {
      success: false,
      message: "An error occurred while subscribing the user",
    };
  }
}

export async function sendUnsubscribeOtp(
  email: string
): Promise<SendOtpResponse> {
  const foundUser = await client.user.findUnique({
    where: { email },
  });

  if (!foundUser) {
    return { success: false, message: "User does not exist" };
  }

  return generateAndSendOtp(email, "UNSUBSCRIBE");
}

export async function verifyUnsubscribeOtp(
  email: string,
  otp: string
): Promise<VerifyOtpResponse> {
  return verifyOtp(email, otp, "UNSUBSCRIBE");
}

export async function deleteUser(email: string): Promise<SubscribeUserResponse> {
  try {
    await client.user.delete({
      where: { email },
    });
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
}
