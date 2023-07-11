import React, { useEffect, useState } from "react";
import PhotoGalleryCard from "./PhotoGalleryCard";

function PhotoGalleryFeed() {
  const [photoGalleryData, setPhotoGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/app-api/v1/photo-gallery-feed-page/page/${page}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      setPhotoGalleryData((prevItems) => [...prevItems, ...data?.nodes]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl my-4 font-semibold text-gray-500">
          Photo Gallery Feed
        </h1>
        <div className="max-w-2xl mx-auto py-4 px-4 ">
          {photoGalleryData?.map((galleryData, index) => (
            <PhotoGalleryCard galleryData={galleryData} key={index} />
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}

export default PhotoGalleryFeed;
