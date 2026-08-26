"use client";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/en/");
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <p>Redirecting to /en/...</p>
    </div>
  );
}
