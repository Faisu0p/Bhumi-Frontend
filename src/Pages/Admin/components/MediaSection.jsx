import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const MediaSection = ({ updateMasterLayoutPlan }) => {
  const [images, setImages] = useState([]); 
  const [imageUrls, setImageUrls] = useState([]); 
  const [uploading, setUploading] = useState(false); 

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

    const blobName = `photos/${Date.now()}-${file.name}`; // Unique file name
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      // Upload the file to Azure Blob Storage
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
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages); 
  };

  // Handle image upload
  const handleUpload = async () => {
    if (images.length > 0) {
      setUploading(true); 

      const uploadedUrls = [];
      for (const image of images) {
        const uploadedUrl = await uploadToAzure(image); 
        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl); 
        }
      }

      setImageUrls(uploadedUrls); 
      updateMasterLayoutPlan(uploadedUrls); 
      setUploading(false); 
    }
  };

  return (
    <section className="form-section">
      {/* File input for selecting images */}
      <div className="input-group">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          multiple // Allow multiple file selection
          onChange={handleImageChange}
        />
      </div>

      {/* Show image previews after selection */}
      {images.length > 0 && (
        <div className="image-preview">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                margin: "5px",
              }}
            />
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="input-group">
        <button
          onClick={handleUpload}
          disabled={uploading || images.length === 0}
          style={{ marginTop: "10px",backgroundColor: "red", color:"white" }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>


    </section>
  );
};

export default MediaSection;
