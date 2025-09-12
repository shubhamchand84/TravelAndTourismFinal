// export default TourListings;
import React, { useState } from "react";
import { FaMountain } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TourListings.css";

// Trek Images (clean imports)
import aliBedniBugyal from "../../assets/images/populars/Ali-Bedni-Bugyal.webp";
import anchorageToLaPaz from "../../assets/images/populars/Anchorage To La Paz.jpg";
import anchorageToQuito from "../../assets/images/populars/Anchorage To Quito.jpg";
import anchorageToSantiago from "../../assets/images/populars/Anchorage To Santiago.jpg";
import anchorageToUshuaia from "../../assets/images/populars/Anchorage To Ushuaia.jpg";
import baliPass from "../../assets/images/populars/baliPass.webp";
import bhriguLake from "../../assets/images/populars/Bhrigu-Lake.avif";
import brahmatal from "../../assets/images/populars/Brahmatal.jpeg";
import chandrsilla from "../../assets/images/populars/chandrsilla.jpg";
import cuzoToAnchorage from "../../assets/images/populars/Cuzco To Anchorage.jpg";
import dehraBugyal from "../../assets/images/populars/dehraBugyal.jpg";
import deoriyatal from "../../assets/images/populars/deoriyatal.jpg";
import discoverSingapore from "../../assets/images/populars/Discover Singapore.png";
import dodital from "../../assets/images/populars/Dodital.webp";
import gaumukhTapovan from "../../assets/images/populars/GaumukhTapovan.avif";
import hamptaPass from "../../assets/images/populars/hamptaPass.webp";
import hariKiDun from "../../assets/images/populars/hariKiDun.jpeg";
import indraharPass from "../../assets/images/populars/indraharPass.avif";
import kafniGlacier from "../../assets/images/populars/kafni-glacier.webp";
import kedarkantha from "../../assets/images/populars/Kedarkantha.avif";
import kiwianaPanorama from "../../assets/images/populars/Kiwiana Panorama.jpg";
import kuariPass1 from "../../assets/images/populars/kuari-pass.jpg";
import kuariPass2 from "../../assets/images/populars/KuariPass.jpg";
import laExplorer from "../../assets/images/populars/LA Explorer.jpg";
import milamGlacier from "../../assets/images/populars/milamGlacier.jpg";
import nagtibbatrek from "../../assets/images/populars/Nagtibbatrek.jpg";
import pindariGlacier from "../../assets/images/populars/pindari-glacier.jpg";
import pinParavati from "../../assets/images/populars/PinParavati.jpg";
import pularaRidge from "../../assets/images/populars/pularaRidge.jpg";
import roopkund from "../../assets/images/populars/roopkund.jpg";
import rupinPass from "../../assets/images/populars/rupinPass.avif";
import valleyOfFlower from "../../assets/images/populars/Valley-of-Flower.jpg";

// Panch Kedar images
import kedarnathImg from "../../assets/images/tours/kedarnath.jpg";
import tungnathImg from "../../assets/images/tours/tungnath.jpeg";
import kalpeshwarImg from "../../assets/images/tours/kalpeshwar.jpg";
import rudranathImg from "../../assets/images/tours/rudranath.jpg";
import madhyamaheshwarImg from "../../assets/images/tours/madhyamaheshwar.jpg";

// Char Dham images
import yamunotriImg from "../../assets/images/tours/yamunotri.jpg";
import gangotriImg from "../../assets/images/tours/gangotri.jpg";
import badrinathImg from "../../assets/images/tours/badrinath.jpg";

// Himachal destinations (placeholder gallery images)
import shimlaImg from "../../assets/images/gallery/g1.jpg";
import manaliImg from "../../assets/images/treks/hampta.jpg";
import dharamshalaImg from "../../assets/images/gallery/g3.jpg";
import dalhousieImg from "../../assets/images/gallery/g7.jpg";

// Tours Data
const toursData = [
  { id: 1, title: "Kedarkantha Trek (Uttarakhand)", slug: "kedarkantha", description: "A scenic winter trek through snow-covered forests.", price: 5999, category: "adventure", state: "Uttarakhand", image: kedarkantha },
  { id: 2, title: "Nag Tibba Trek (Uttarakhand)", slug: "nagtibba", description: "A popular weekend trek near Dehradun and Mussoorie.", price: 3999, category: "adventure", state: "Uttarakhand", image: nagtibbatrek },
  { id: 3, title: "Chopta Chandrashila Trek (Uttarakhand)", slug: "chandrashila", description: "A trek leading to Tungnath Temple and Chandrashila peak.", price: 4999, category: "adventure", state: "Uttarakhand", image: chandrsilla },
  { id: 4, title: "Deoriatal Trek (Uttarakhand)", slug: "deoriatal", description: "A short trek to a pristine lake with Himalayan views.", price: 4499, category: "adventure", state: "Uttarakhand", image: deoriyatal },
  { id: 5, title: "Dayara Bugyal Trek (Uttarakhand)", slug: "dayarabugyal", description: "Rolling alpine meadows with panoramic Himalayan views.", price: 5499, category: "adventure", state: "Uttarakhand", image: dehraBugyal },
  { id: 6, title: "Brahmatal Trek (Uttarakhand)", slug: "brahmatal", description: "A winter trek to a frozen lake with spectacular views.", price: 5999, category: "adventure", state: "Uttarakhand", image: brahmatal },
  { id: 7, title: "Valley of Flowers Trek (Uttarakhand)", slug: "valleyofflowers", description: "UNESCO World Heritage trek with vibrant alpine flowers.", price: 7499, category: "adventure", state: "Uttarakhand", image: valleyOfFlower },
  { id: 8, title: "Dodital Trek (Uttarakhand)", slug: "dodital", description: "A serene trek to a freshwater lake, home to trout.", price: 5499, category: "adventure", state: "Uttarakhand", image: dodital },
  { id: 9, title: "Kuari Pass Trek (Uttarakhand)", slug: "kuaripass", description: "Lord Curzon's Trail with grand Himalayan views.", price: 5999, category: "adventure", state: "Uttarakhand", image: kuariPass2 },
  { id: 10, title: "Phulara Ridge Trek (Uttarakhand)", slug: "phulararidge", description: "One of India's best ridge treks with panoramic views.", price: 6499, category: "adventure", state: "Uttarakhand", image: pularaRidge },
  { id: 11, title: "Ali Bedni Bugyal Trek (Uttarakhand)", slug: "alibednibugyal", description: "Two vast alpine meadows with stunning backdrops.", price: 5999, category: "adventure", state: "Uttarakhand", image: aliBedniBugyal },
  { id: 12, title: "Roopkund Trek (Uttarakhand)", slug: "roopkund", description: "Challenging trek to the famous 'Skeleton Lake'.", price: 8999, category: "adventure", state: "Uttarakhand", image: roopkund },
  { id: 13, title: "Har Ki Dun Trek (Uttarakhand)", slug: "harkidun", description: "Classic trek through ancient villages and alpine scenery.", price: 7499, category: "adventure", state: "Uttarakhand", image: hariKiDun },
  { id: 14, title: "Pindari Glacier Trek (Uttarakhand)", slug: "pindariglacier", description: "Trek to the snout of the Pindari Glacier.", price: 8499, category: "adventure", state: "Uttarakhand", image: pindariGlacier },
  { id: 15, title: "Kafni Glacier Trek (Uttarakhand)", slug: "kafniglacier", description: "A rugged trek often combined with Pindari Glacier.", price: 8999, category: "adventure", state: "Uttarakhand", image: kafniGlacier },
  { id: 16, title: "Milam Glacier Trek (Uttarakhand)", slug: "milamglacier", description: "Longest glacier in the Kumaon Himalayas.", price: 9999, category: "adventure", state: "Uttarakhand", image: milamGlacier },
  { id: 17, title: "Gaumukh Tapovan Trek (Uttarakhand)", slug: "gaumukhtapovan", description: "Spiritual trek to the source of the Ganga.", price: 8499, category: "adventure", state: "Uttarakhand", image: gaumukhTapovan },
  { id: 18, title: "Bali Pass Trek (Uttarakhand)", slug: "balipass", description: "A thrilling trek connecting Yamunotri and Har Ki Dun valleys.", price: 9499, category: "adventure", state: "Uttarakhand", image: baliPass },
  { id: 19, title: "Rupin Pass Trek (Uttarakhand)", slug: "rupinpass", description: "Trek from Uttarakhand into Himachal Pradesh.", price: 9499, category: "adventure", state: "Uttarakhand", image: rupinPass },

  // Himachal Treks
  { id: 20, title: "Hampta Pass Trek (Himachal Pradesh)", slug: "hamptapass", description: "Crossover trek from Kullu to Spiti.", price: 6999, category: "adventure", state: "Himachal Pradesh", image: hamptaPass },
  { id: 21, title: "Bhrigu Lake Trek (Himachal Pradesh)", slug: "bhrigulake", description: "Trek to a high-altitude glacial lake near Manali.", price: 5499, category: "adventure", state: "Himachal Pradesh", image: bhriguLake },
  { id: 22, title: "Pin Parvati Trek (Himachal Pradesh)", slug: "pinparvati", description: "Adventure trek from Kullu to Spiti.", price: 7999, category: "adventure", state: "Himachal Pradesh", image: pinParavati },
  { id: 23, title: "Indrahar Pass Trek (Himachal Pradesh)", slug: "indraharpass", description: "Trek in the Dhauladhar range with Kangra valley views.", price: 6999, category: "adventure", state: "Himachal Pradesh", image: indraharPass },
];

// Panch Kedar Data
const panchKedarData = [
  { id: 13, name: "Kedarnath Dham", description: "The sacred Kedarnath temple and nearby trek routes.", image: kedarnathImg },
  { id: 14, name: "Tungnath", description: "The highest Shiva temple and beautiful trek trails.", image: tungnathImg },
  { id: 15, name: "Kalpeshwar", description: "A serene temple nestled in dense forests.", image: kalpeshwarImg },
  { id: 16, name: "Rudranath", description: "A remote temple surrounded by rich flora and fauna.", image: rudranathImg },
  { id: 17, name: "Madhyamaheshwar", description: "A sacred shrine with scenic mountain views.", image: madhyamaheshwarImg },
];

// Char Dham Data
const charDhamData = [
  { id: 10, name: "Yamunotri Dham", description: "The source of the Yamuna River and a revered pilgrimage spot.", image: yamunotriImg },
  { id: 11, name: "Gangotri Dham", description: "The origin of the holy Ganges River.", image: gangotriImg },
  { id: 12, name: "Badrinath Dham", description: "One of the holiest temples dedicated to Lord Vishnu.", image: badrinathImg },
  { id: 13, name: "Kedarnath Dham", description: "The sacred temple dedicated to Lord Shiva.", image: kedarnathImg },
];

const categoryIcons = {
  adventure: <FaMountain />,
};

const TourListings = () => {
  const [selectedState, setSelectedState] = useState("all");

  const filteredTours =
    selectedState === "all"
      ? toursData
      : toursData.filter((tour) => tour.state === selectedState);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-blue-800 fw-bold">
        Himalayan Trek Listings
      </h2>
      <p className="lead text-center text-gray-700 mb-5">
        Explore the most scenic trekking experiences in Uttarakhand and Himachal
        Pradesh.
      </p>

      {/* State Filter */}
      <div className="filter-buttons text-center mb-5">
        {["all", "Uttarakhand", "Himachal Pradesh"].map((state) => (
          <button
            key={state}
            className={`filter-btn ${selectedState === state ? "active" : ""}`}
            onClick={() => setSelectedState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Trek Cards */}
      <div className="row">
        {filteredTours.map((tour) => (
          <div className="col-md-4 mb-4" key={tour.id}>
            <div className="tour-card shadow-sm">
              <img src={tour.image} alt={tour.title} className="tour-img" />
              <div className="tour-content p-3">
                <h5 className="fw-bold">{tour.title}</h5>
                <p className="text-muted">{tour.description}</p>
                <p className="fw-bold text-primary">
                  ₹{tour.price.toLocaleString()}
                </p>
                <span className="category-icon">
                  {categoryIcons[tour.category]}
                </span>
                <Link
                  to={`/tour/${tour.slug}`}
                  className="btn btn-outline-primary mt-2 w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Panch Kedar Section */}
      <h2 className="mb-4 text-center text-green-700 fw-bold mt-5">
        Panch Kedar Destinations
      </h2>
      <p className="lead text-center text-gray-700 mb-4">
        Discover the five sacred temples of Panch Kedar nestled in the Himalayas.
      </p>
      <div className="row">
        {panchKedarData.map((place) => (
          <div className="col-md-3 mb-4" key={place.id}>
            <div className="panchkedar-card shadow-sm">
              <img src={place.image} alt={place.name} className="panchkedar-img" />
              <div className="panchkedar-content p-3">
                <h5 className="fw-bold">{place.name}</h5>
                <p className="text-muted">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Char Dham Section */}
      <h2 className="mb-4 text-center text-indigo-700 fw-bold mt-5">
        Char Dham Destinations
      </h2>
      <p className="lead text-center text-gray-700 mb-4">
        Visit the four sacred Char Dham pilgrimage sites in Uttarakhand.
      </p>
      <div className="row">
        {charDhamData.map((place) => (
          <div className="col-md-3 mb-4" key={place.id}>
            <div className="chardham-card shadow-sm">
              <img src={place.image} alt={place.name} className="chardham-img" />
              <div className="chardham-content p-3">
                <h5 className="fw-bold">{place.name}</h5>
                <p className="text-muted">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourListings;
