// import { sendEmail } from "@/utils/mail_utils";

// export async function POST(req: Request) {
//   try {
//     // You can optionally parse JSON from request body if you want dynamic recipients
//     // const body = await req.json();
//     // const { recipientEmail } = body;

//     const sender = {
//       name: "My App",
//       address: "no-reply@example.com",
//     };
//     const recipients = [
//       {
//         name: "John Doe",
//         address: "emmanueldouglas42@gmail.com", // or recipientEmail from body
//       },
//     ];

//     const result = await sendEmail({
//       sender,
//       recipients,
//       subject: "Welcome to our Website!",
//       message: "You are welcome to our platform",
//     });

//     return new Response(JSON.stringify({ accepted: result.accepted }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.error("Error sending email:", error);
//     return new Response(
//       JSON.stringify({ message: "Unable to send email. Try again later." }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


import { sendEmail } from '@/utils/mail_utils';

export async function POST(req: Request) {
  try {
    // Hardcoded sender/recipient
    const result = await sendEmail({
      sender: { name: "My App", address: "no-reply@example.com" },
      recipients: [{ name: "John Doe", address: "emmanueldouglas42@gmail.com" }],
      subject: "Welcome to our Website!",
      message: "You are welcome to our platform",
    });

    return new Response(JSON.stringify({ accepted: result.accepted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Unable to send email" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
