import React, { useState, useEffect } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/material";

const ImageHandler = ({ localStorageName }) => {
  const fileUploadLimit = 1048576; // 1MB in bytes.
  const localStorageKey = localStorageName;
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData !== null) {
      console.log("here");
      setImageData(JSON.parse(localStorageData));
    }
  }, []);

  const addImage = (imageObj) => {
    const updatedImageData = [...imageData, imageObj];
    setImageData(updatedImageData);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedImageData));
  };

  const removeImage = (timestamp) => {
    const updatedImageData = imageData.filter(
      (img) => img.timestamp !== timestamp
    );
    setImageData(updatedImageData);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedImageData));
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];

    if (file.size <= fileUploadLimit) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        const imageObj = {
          name: `image-${imageData.length + 1}`,
          timestamp: Date.now(),
          file_base64: base64String.toString(),
        };

        addImage(imageObj);

        // Clear upload element.
        e.target.value = "";
      };

      reader.readAsDataURL(file);
    } else {
      alert("File too large");
    }
  };

  return (
    <div>
      {imageData.length == 1 ? (
        <RenderImagesComponent
          imageData={imageData}
          removeImage={removeImage}
        />
      ) : (
        <AddImageComponent handleUploadChange={handleUploadChange} />
      )}
    </div>
  );
};

const AddImageComponent = ({ handleUploadChange }) => {
  return (
    <label htmlFor="contained-button-file">
      <Button
        variant="text"
        component="span"
        className="border-blue border-dashed border-2 w-full h-20 gap-3"
      >
        <AddAPhotoIcon /> Add a profile image
        <input
          accept="image/*"
          className="hidden"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadChange}
        />
      </Button>
    </label>
  );
};

const RenderImagesComponent = ({ imageData, removeImage }) => {
  const renderImage = (imageObj) => {
    if (imageObj.file_base64.length) {
      return (
        <div key={imageObj.timestamp} className="flex flex-col gap-2">
          <img
            src={`data:image/png;base64,${imageObj.file_base64}`}
            alt={imageObj.name}
            width="200"
          />

          <Button
            onClick={() => removeImage(imageObj.timestamp)}
            className="bg-orange text-white w-fit"
            sx={{
              ml: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#D1410C",
              },
            }}
          >
            Remove
          </Button>
        </div>
      );
    }
    return null;
  };
  return <ul>{imageData.map((imageObj) => renderImage(imageObj))}</ul>;
};

export default ImageHandler;
