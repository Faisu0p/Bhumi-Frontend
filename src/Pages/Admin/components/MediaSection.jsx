import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const MediaSection = ({ updateMasterLayoutPlan, maxSize = 5 * 1024 * 1024 , previewStyle }) => {  // Default size is 5MB
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Function to upload the image to Azure Blob Storage
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

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      // Check the file type (MIME type) against allowed image types
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please select an image file (jpg or png).");
        setImage(null);
        return;
      }
  
      // Check file size against the maxSize prop (optional)
      if (selectedFile.size > maxSize) {
        setError(`File size exceeds the limit of ${maxSize / (1024 * 1024)}MB. Please select a smaller image.`);
        setImage(null); 
        return;
      }
  
      setError(""); 
      setImage(selectedFile);
    }
  };
  

  // Handle image upload
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
    <section className="form-section">
      <div className="input-group">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}  // Single image selection
        />
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {image && !error && (
        <div className="image-preview">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              margin: "5px",
              ...previewStyle
            }}
          />
        </div>
      )}

      <div className="input-group">
        <button
          onClick={handleUpload}
          disabled={uploading || !image}
          style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      
    </section>
  );
};

export default MediaSection;
