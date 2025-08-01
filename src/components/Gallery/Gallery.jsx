import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

// Image imports
import GalleryImg1 from "../../assets/images/gallery/g1.jpg";
import GalleryImg3 from "../../assets/images/gallery/g3.jpg";
import GalleryImg4 from "../../assets/images/gallery/g4.jpg";
import GalleryImg6 from "../../assets/images/gallery/g6.jpg";
import GalleryImg7 from "../../assets/images/gallery/g7.jpg";

// Photo metadata
const photos = [
  { src: GalleryImg1, width: 4, height: 3, desc: "Mountain Sunrise" },
  { src: GalleryImg3, width: 4, height: 3, desc: "Historic Fort, India" },
  { src: GalleryImg6, width: 3, height: 4, desc: "Desert Dunes" },
  { src: GalleryImg4, width: 4, height: 3, desc: "Jaipur, Rajasthan" },
  { src: GalleryImg7, width: 4, height: 3, desc: "Serene Lake" },
  { src: GalleryImg6, width: 4, height: 3, desc: "White Rann of Kutch" },
];

const GalleryComponent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800">📸 Our Travel Moments</h2>

      <div className="rounded-2xl shadow-xl border border-gray-200 p-6 bg-white hover:shadow-2xl transition-all duration-300">
        <Gallery photos={photos} onClick={openLightbox} />
      </div>

      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                caption: x.desc,
              }))}
              styles={{
                footer: (base) => ({
                  ...base,
                  padding: "16px",
                  fontSize: "16px",
                  color: "#fff",
                  background: "rgba(0,0,0,0.6)",
                }),
              }}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};

export default GalleryComponent;
