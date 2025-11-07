"use client";
import React, { useState , ChangeEvent, FormEvent  } from "react";

interface FormData {
  to: string;
  subject: string;
  text: string;
}

const EmailSender: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [result , setResult] = useState<Record<string ,string >>({});
   const [status, setStatus] = useState<string>("");
const [formData, setFormData] = useState<FormData>({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     setStatus("Sending...");
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
          setStatus("Email sent successfully!");
        setFormData({ to: "", subject: "", text: "" });
        alert("Email sent successfully!");
      } else {
        alert("Error sending email: " + data.error);
          setStatus("Error sending email: " + data.error);
      }
    } catch (err:any) {
       console.error(err);
      setStatus("Unexpected error: " + err.message);
      alert("An unexpected error occurred");
    }
  };
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
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "1.5rem",
//         borderRadius: "8px",
//         maxWidth: "400px",
//         margin: "2rem auto",
//         textAlign: "center",
//       }}
//     >
//       <p style={{ marginBottom: "1rem" }}>
//         Enter your email below to receive a welcome message:
//       </p>

//       <input
//         type="email"
//         placeholder="Your email"
//         value={recipientEmail}
//         onChange={(e) => setRecipientEmail(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "0.5rem",
//           marginBottom: "1rem",
//           borderRadius: "4px",
//           border: "1px solid #ccc",
//           fontSize: "1rem",
//         }}
//       />
//       <div className="my-4">{JSON.stringify(result)}</div>
// {loading && <div className="my-4"> processing</div>}
//       <button
//         onClick={sendEmail}
//         disabled={loading}
//         style={{
//           backgroundColor: "#D87D4A",
//           color: "white",
//           border: "none",
//           padding: "0.75rem 1.5rem",
//           borderRadius: "4px",
//           cursor: "pointer",
//           fontWeight: 600,
//         }}
//       >
//         {loading ? "Sending..." : "Send Email"}
//       </button>
        
//       {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
//       {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
//     </div>
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Send an Email</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">To</label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="recipient@example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Send Email
        </button>

        {status && <p className="text-center text-blue-600 font-medium mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default EmailSender;
