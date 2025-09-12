import React from "react";

// Image imports
import GalleryImg1 from "../../assets/images/gallery/valleyOflowers.webp";
import GalleryImg3 from "../../assets/images/gallery/kedarnath.webp";
import GalleryImg4 from "../../assets/images/gallery/kedarkantha.webp";
import GalleryImg6 from "../../assets/images/gallery/rishikesh.webp";
import GalleryImg7 from "../../assets/images/gallery/Hari-Ki-Doon-Day.webp";
import GalleryImg5 from "../../assets/images/gallery/dayraBugyal.webp";
import GalleryImg2 from "../../assets/images/gallery/kuari-pass-trek.webp";

// Photo metadata
const photos = [
  { src: GalleryImg1, desc: "Valley of Flowers" },
  { src: GalleryImg3, desc: "Kedarnath" },
  { src: GalleryImg6, desc: "Rishikesh" },
  { src: GalleryImg4, desc: "Kedarkantha" },
  { src: GalleryImg7, desc: "Hari Ki Doon Day" },
  { src: GalleryImg5, desc: "Dayra Bugyal" },
  { src: GalleryImg2, desc: "kuari pass trek" },
 
];

const GalleryComponent = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800">📸 Our Travel Moments</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
        className="rounded-2xl shadow-xl p-6 bg-white hover:shadow-2xl transition-all duration-300"
      >
        {photos.map((photo, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img
              src={photo.src}
              alt={photo.desc}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "8px",
              }}
            />
            <div style={{ fontSize: "1rem", color: "#333" }}>{photo.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryComponent;
