"use client";
import React, { useState } from "react";

const EmailSender: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [result , setResult] = useState<Record<string ,string >>({});
//   const handleSendEmail = async () => {
//     if (!recipientEmail) {
//       setError("Please enter your email.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sender: { name: "My App", address: "no-reply@example.com" },
//           recipients: [{ name: "", address: recipientEmail }],
//           subject: "Welcome to our Website!",
//           message: "You are welcome to our platform",
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json().catch(() => ({}));
//         throw new Error(data?.message || "Failed to send email");
//       }

//       const data = await response.json();
//       if (data.accepted?.length > 0) {
//         setSuccess("Email sent successfully!");
//         setRecipientEmail(""); // reset input
//       } else {
//         setError("Unable to send email. Try again later.");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };
const sendEmail = () => {
  setLoading(true);
  fetch('/api/emails', {
    method: 'POST',
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => setResult(data))
    .catch(error => setResult(error))
    .finally(() => setLoading(false));
};

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1.5rem",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "2rem auto",
        textAlign: "center",
      }}
    >
      <p style={{ marginBottom: "1rem" }}>
        Enter your email below to receive a welcome message:
      </p>

      <input
        type="email"
        placeholder="Your email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      <div className="my-4">{JSON.stringify(result)}</div>
{loading && <div className="my-4"> processing</div>}
      <button
        onClick={sendEmail}
        disabled={loading}
        style={{
          backgroundColor: "#D87D4A",
          color: "white",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
        
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default EmailSender;
