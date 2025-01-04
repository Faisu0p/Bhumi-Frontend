import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const MediaSection = ({
  updateMasterLayoutPlan,
  maxSize = 5 * 1024 * 1024, // Default max file size is 5MB
  previewStyle = {}, // Default preview style
  allowedTypes = ["image/jpeg", "image/png"], // Default allowed types
}) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const uniqueId = React.useId(); // Generates a unique ID for each instance

  const uploadToAzure = async (file) => {
    const accountName = "bhoomistorage2024";
    const containerName = "newbhumidata";
    const blobSasToken =
      "sp=racwdli&st=2024-12-04T14:25:54Z&se=2025-12-04T22:25:54Z&sv=2022-11-02&sr=c&sig=yY3GKRKA9mX8N4BtwK%2F0t5v%2B%2BkgiPaAMQX%2FMDUmY6is%3D";

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${blobSasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `photos/${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(file);
      const uploadedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
      return uploadedUrl;
    } catch (error) {
      console.error("Azure Upload Error:", error);
      return null;
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}.`);
        setImage(null);
        return;
      }

      if (selectedFile.size > maxSize) {
        setError(`File size exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB.`);
        setImage(null);
        return;
      }

      setError("");
      setImage(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (image) {
      setUploading(true);
      const uploadedUrl = await uploadToAzure(image);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        updateMasterLayoutPlan([uploadedUrl]);
      }
      setUploading(false);
    }
  };

  return (
    <section
      className="media-component-form-section"
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="media-component-input-group" style={{ marginBottom: "15px" }}>
        <input
          type="file"
          id={`media-component-imageUpload-${uniqueId}`}
          accept={allowedTypes.join(",")}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor={`media-component-imageUpload-${uniqueId}`}
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          Choose File
        </label>
        <div
          style={{
            display: "inline-block",
            marginLeft: "10px",
            padding: "8px 12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            color: image ? "#333" : "#888",
            fontStyle: image ? "normal" : "italic",
            border: "1px solid #ccc",
          }}
        >
          {image ? image.name : "No file chosen"}
        </div>
      </div>

      {error && (
        <div
          className="media-component-error"
          style={{ color: "red", marginBottom: "15px" }}
        >
          {error}
        </div>
      )}

      {image && !error && (
        <div
          className="media-component-image-preview"
          style={{
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "10px",
            display: "inline-block",
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              ...previewStyle,
            }}
          />
        </div>
      )}

      <div className="media-component-input-group">
        <button
          onClick={handleUpload}
          disabled={uploading || !image}
          style={{
            marginTop: "10px",
            backgroundColor: uploading ? "#ccc" : "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: uploading || !image ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </section>
  );
};

export default MediaSection;
