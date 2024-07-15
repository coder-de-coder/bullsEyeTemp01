
export type EmailType = "SUBSCRIBE" | "UNSUBSCRIBE" | "ALERT";

export type EmailContent = {
  subject: string;
  body: string;
};
