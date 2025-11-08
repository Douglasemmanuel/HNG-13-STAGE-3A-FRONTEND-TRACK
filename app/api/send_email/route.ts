import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { generateOrderEmailHtml } from "@/lib/emailTemplate";
import { useCartStore } from "@/store/cart_store";

// const { cart, subtotal, vat, shipping, grandTotal } = useCartStore.getState();
export async function POST(req: NextRequest) {
  try {
    const { to, subject, text , subtotal , cart , shipping , vat , grandTotal } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
const htmlContent = generateOrderEmailHtml(
  {
    customer: { name: to },
    items: cart, 
    totals: {
      subtotal,
      shipping,
      tax: vat,
      grandTotal: grandTotal,
    },
  },
  to
);


    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html:htmlContent ,
    });

    console.log("Message sent:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
