// src/components/Spinner.jsx
import React from "react";
import '../css/loader.css';  // We'll create this CSS file next

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}