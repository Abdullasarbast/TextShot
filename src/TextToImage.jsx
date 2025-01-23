import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const TextToImage = () => {
  const [lines, setLines] = useState(["بسم الله الرحمن الرحيم","","","١/","٢/","٣/","٤/","٥/","٦/","٧/","٨/","٩/","١٠/","١١/","١٢/","١٣/","١٤/","١٥/","١٦/","١٧/","١٨/","١٩/","٢٠/","٢١/","٢٢/","٢٣/","٢٤/","٢٥/","٢٦/","٢٧/","٢٨/","٢٩/","٣٠/"]);
  const [currentLine, setCurrentLine] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const previewRef = useRef(null);

  // Add or update a line
  const handleAddLine = () => {
    if (editIndex !== null) {
      // Update the line
      const updatedLines = [...lines];
      updatedLines[editIndex] = currentLine;
      setLines(updatedLines);
      setEditIndex(null); // Reset edit index
    } else {
      // Add a new line
      setLines([...lines, currentLine]);
    }
    setCurrentLine(""); // Clear input field
  };

  // Edit a line
  const handleEditLine = (index) => {
    setCurrentLine(lines[index]);
    setEditIndex(index);
  };

  // Delete a line
  const handleDeleteLine = (index) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  // Save the image
const saveAsImage = async () => {
  if (!previewRef.current) return;

  // Hide the buttons
  const buttons = document.querySelectorAll(".line-buttons");
  buttons.forEach((button) => (button.style.display = "none"));

  // Capture the screenshot
  const canvas = await html2canvas(previewRef.current);
  const imgData = canvas.toDataURL("image/jpeg");

  // Show the buttons again
  buttons.forEach((button) => (button.style.display = ""));

  // Save the image
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "text-image.jpg";
  link.click();
};


  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      {/* Input Section */}
      <div>
        <input
          className="font_Rabar_021"
          type="text"
          value={currentLine}
          onChange={(e) => setCurrentLine(e.target.value)}
          placeholder="Enter text here..."
          style={{
            width: "300px",
            padding: "8px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleAddLine}
          style={{
            marginRight: "10px",
            padding: "8px 12px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update Line" : "Add Line"}
        </button>
      </div>

      {/* Preview Section */}
      <div
        ref={previewRef}
        style={{
          margin: "20px auto",
          width: "370px",
          minHeight: "200px",
          padding: "20px",
          background: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              textAlign: "start",
              marginBottom: "5px",
            }}
          >
            <span
              className="font_Rabar_021"
              style={{ fontSize: "18px", color: "#333" }}
            >
              {line}
            </span>
            <div>
              <button
                onClick={() => handleEditLine(index)}
                className="line-buttons"
                style={{
                  marginLeft: "5px",
                  padding: "5px 10px",
                  background: "#ffc107",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteLine(index)}
                className="line-buttons"
                style={{
                  padding: "5px 10px",
                  background: "#dc3545",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Image Button */}
      <button
        onClick={saveAsImage}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save as JPG
      </button>
    </div>
  );
};

export default TextToImage;
