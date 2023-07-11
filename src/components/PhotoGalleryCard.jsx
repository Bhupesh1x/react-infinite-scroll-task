import React from "react";

function PhotoGalleryCard({ galleryData }) {
  return (
    <div className="flex items-start gap-4 my-4">
      <img
        src={galleryData.node?.field_photo_image_section}
        alt="gallery_image"
        className="h-44 w-44 object-cover rounded-lg"
      />
      <div>
        <p className="font-semibold text-xl">{galleryData.node?.title}</p>
        <p className="text-gray-500 mt-2">{galleryData.node?.path}</p>
      </div>
    </div>
  );
}

export default PhotoGalleryCard;
