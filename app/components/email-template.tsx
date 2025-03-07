// Din't rendered the component===========================

import * as React from "react";

interface VerificationEmailProps {
  firstName?: string;
  verificationCode: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  firstName = "User",
  verificationCode,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ textAlign: "center", color: "#805ad5" }}>ProTrack</div>
      <h2 style={{ color: "#333", textAlign: "center" }}>Verify Your Email</h2>
      <p style={{ fontSize: "16px", color: "#555", textAlign: "center" }}>
        Hello {firstName}, <br />
        Use the verification code below to verify your email address.
      </p>
      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#4f46e5",
          padding: "10px",
          background: "#f3f4f6",
          borderRadius: "8px",
          display: "inline-block",
          margin: "20px auto",
        }}
      >
        {verificationCode}
      </div>
      <p style={{ fontSize: "14px", color: "#777", textAlign: "center" }}>
        This code will expire in <strong>10 minutes</strong>. If you didn’t
        request this, you can ignore this email.
      </p>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          margin: "20px 0",
        }}
      />
      <p style={{ fontSize: "12px", color: "#888", textAlign: "center" }}>
        © {new Date().getFullYear()} ProTrack. All rights reserved.
      </p>
    </div>
  );
};
