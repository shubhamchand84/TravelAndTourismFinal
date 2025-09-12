import React from "react";
import { useParams, Link } from "react-router-dom";
import "./TourDetail.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaMountain, FaSnowflake, FaSun, FaLeaf, FaCloudRain } from "react-icons/fa";

// Import images
import kedarkanthaImg from "../../assets/images/populars/Kedarkantha.avif";

import aliBedniBugyal from "../../assets/images/populars/Ali-Bedni-Bugyal.webp";

import baliPass from "../../assets/images/populars/baliPass.webp";
import bhriguLake from "../../assets/images/populars/Bhrigu-Lake.avif";
import brahmatal from "../../assets/images/populars/Brahmatal.jpeg";
import chandrsilla from "../../assets/images/populars/chandrsilla.jpg";

import dehraBugyal from "../../assets/images/populars/dehraBugyal.jpg";
import deoriyatal from "../../assets/images/populars/deoriyatal.jpg";
import dodital from "../../assets/images/populars/Dodital.webp";
import gaumukhTapovan from "../../assets/images/populars/GaumukhTapovan.avif";
import hamptaPass from "../../assets/images/populars/hamptaPass.webp";
import hariKiDun from "../../assets/images/populars/hariKiDun.jpeg";
import indraharPass from "../../assets/images/populars/indraharPass.avif";
import kafniGlacier from "../../assets/images/populars/kafni-glacier.webp";
import kedarkantha from "../../assets/images/populars/Kedarkantha.avif";

import kuariPass1 from "../../assets/images/populars/kuari-pass.jpg";

import milamGlacier from "../../assets/images/populars/milamGlacier.jpg";
import nagtibbatrek from "../../assets/images/populars/Nagtibbatrek.jpg";
import pindariGlacier from "../../assets/images/populars/pindari-glacier.jpg";
import pinParavati from "../../assets/images/populars/PinParavati.jpg";
import pularaRidge from "../../assets/images/populars/pularaRidge.jpg";
import roopkund from "../../assets/images/populars/roopkund.jpg";
import rupinPass from "../../assets/images/populars/rupinPass.avif";
import valleyOfFlower from "../../assets/images/populars/Valley-of-Flower.jpg";


// Tour data
const tourData = {
  kedarkantha: {
    id: "kedarkantha",
    title: "Kedarkantha Trek: The Crown of the Himalayas",
    description: "The Kedarkantha Trek is a well-loved winter trek in the Garhwal Himalayas. It's renowned for its breathtaking snow-covered landscapes, dense pine forests, and a summit that offers a 360-degree view of majestic Himalayan peaks. Often considered a perfect trek for beginners and seasoned trekkers alike, Kedarkantha is a journey into a winter wonderland that is both thrilling and accessible. The trail is well-defined, making it a safe and popular choice.",
    image: kedarkanthaImg,
    price: 5999,
    difficulty: "Easy to Moderate",
    duration: "5 Days",
    bestTime: [
      {
        season: "Winter (December to March)",
        description: "This is the peak season for the trek. The entire trail is covered in a thick blanket of snow, and the campsites are transformed into magical snow playgrounds. The summit climb during this time is an exhilarating challenge.",
        icon: <FaSnowflake />
      },
      {
        season: "Summer (April to June)",
        description: "The snow melts, revealing lush green meadows and vibrant wildflowers. The weather is pleasant, and the views are clear, making it an excellent time for those who prefer to avoid the cold and snow.",
        icon: <FaSun />
      }
    ],
    attractions: [
      {
        name: "The Summit View",
        description: "The 360-degree panorama from the 12,500-foot summit is the main highlight. You can see peaks like Swargarohini, Bandarpunch, and Black Peak."
      },
      {
        name: "Juda Ka Talab",
        description: "A serene and beautiful lake that remains frozen during the winter months, surrounded by tall pine trees."
      },
      {
        name: "The Pine Forests",
        description: "The trek takes you through dense, beautiful pine and oak forests, offering a true sense of Himalayan wilderness."
      },
      {
        name: "Rich Mythology",
        description: "The trek holds cultural significance as locals believe Lord Shiva meditated here."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trail is well-paved, and the ascent is not overly steep."
      },
      {
        title: "How to Reach",
        description: "The base camp for the trek is Chopta. The nearest major railway station is Rishikesh (RKSH) or Haridwar (HW). From there, you can hire a private taxi or take a bus to Chopta."
      },
      {
        title: "Accommodation",
        description: "Hotels, guesthouses, and camps are available in Chopta and Sari village."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Rishikesh to Chopta (2,680 m) and trek to Deoriatal (2,438 m)",
        description: "A long, scenic drive from Rishikesh to the village of Sari. From there, you will trek to the beautiful Deoriatal lake."
      },
      {
        day: "Day 2",
        title: "Trek from Deoriatal to Chopta",
        description: "After enjoying the sunrise at Deoriatal, you will trek down to Sari and then take a short drive or a trek to Chopta."
      },
      {
        day: "Day 3",
        title: "Trek from Chopta to Tungnath (3,680 m) and Chandrashila Summit (4,000 m)",
        description: "An early morning start to trek to Tungnath. After a short rest, a final climb will take you to the Chandrashila Summit for the panoramic views. You'll descend back to Chopta for the night."
      },
      {
        day: "Day 4",
        title: "Drive from Chopta back to Rishikesh",
        description: "A final scenic drive from Chopta back to Rishikesh, concluding the journey."
      }
    ]
  },
  
  deoriatal: {
    id: "deoriatal",
    title: "Deoriatal Trek: The Lake of Divine Reflections",
    description: "The Deoriatal Trek is a short, easy hike to a serene and pristine lake nestled in the Garhwal Himalayas. The lake, also known as 'Devriyatal,' holds mythological significance, as it is believed to be the place where the gods (Devas) bathed. The trek is popular for its easy trail and the stunning reflections of the Chaukhamba peaks in the lake's crystal-clear waters. It is often a starting point for more extensive treks in the region.",
    image: deoriyatal, // Placeholder - replace with actual image
    price: 4499,
    difficulty: "Easy",
    duration: "2 Days",
    bestTime: [
      {
        season: "Summer (March to June)",
        description: "The weather is pleasant and comfortable, with lush green forests and a cool breeze, making it an ideal time for a casual hike.",
        icon: <FaSun />
      },
      {
        season: "Monsoon (July to September)",
        description: "The region becomes exceptionally green, and the hillsides are covered in lush vegetation.",
        icon: <FaCloudRain />
      },
      {
        season: "Winter (November to March)",
        description: "The lake can freeze over, and the surrounding areas are often covered in snow, offering a magical and serene winter landscape.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "Deoriatal Lake",
        description: "The main attraction, with its perfect reflection of the Chaukhamba peaks."
      },
      {
        name: "Sari Village",
        description: "The small, picturesque village serves as the base camp and offers a glimpse into the local Garhwali culture."
      },
      {
        name: "Forest Walk",
        description: "The trek takes you through beautiful forests of oak, rhododendron, and deodar."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy. The trek is short and has a gradual ascent, making it perfect for beginners, children, and families."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Sari village. The nearest major railway station is Rishikesh (RKSH). From there, you can hire a private taxi or take a bus to Sari, which is a scenic 6-7 hour drive."
      },
      {
        title: "Accommodation",
        description: "Homestays are available in Sari village. You can also camp near the lake with a permit."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Rishikesh to Sari, Trek to Deoriatal (2,438 m)",
        description: "A scenic drive from Rishikesh to the village of Sari. The trek begins with a gentle climb through the village and forest to reach the lake."
      },
      {
        day: "Day 2",
        title: "Sunrise at Deoriatal, Trek back to Sari, Drive to Rishikesh",
        description: "Wake up early to witness the breathtaking sunrise over the Chaukhamba peaks reflected in the lake. After breakfast, you will trek back down to Sari and drive back to Rishikesh."
      }
    ]
  },
  
  dayarabugyal: {
    id: "dayarabugyal",
    title: "Dayara Bugyal Trek: The Meadow of the Garhwal",
    description: "Dayara Bugyal is one of the most stunning alpine meadows (bugyal) in the Garhwal Himalayas. Located in the Uttarkashi district, this trek is a visual delight, with vast, rolling meadows that offer a spectacular panoramic view of the Himalayas. The trek is a perfect mix of dense forests, open grasslands, and incredible mountain vistas, making it ideal for both beginners and experienced trekkers.",
    image: dehraBugyal,
    price: 5499,
    difficulty: "Easy to Moderate",
    duration: "4 Days",
    bestTime: [
      {
        season: "Summer (May to June)",
        description: "The ideal time for the trek. The weather is pleasant, and the meadows are lush and green.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "The weather is clear, offering the best views of the surrounding peaks. The meadows are a beautiful mix of green and golden hues.",
        icon: <FaLeaf />
      },
      {
        season: "Winter (December to March)",
        description: "The meadows are covered in snow, transforming the landscape into a winter wonderland, which makes it a popular winter trek.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "The Dayara Bugyal",
        description: "The main attraction, with its endless, rolling meadows that provide a perfect campsite and a stunning vista point."
      },
      {
        name: "Views of Bandarpoonch and Black Peak",
        description: "The trek offers a magnificent view of prominent peaks, including Bandarpoonch, Gangotri, and Kala Nag."
      },
      {
        name: "Barnala Tal",
        description: "A small, serene lake that lies on the trail, surrounded by forests."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trail has a gradual climb and is suitable for trekkers of all ages."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Raithal village or Barsu village. The nearest major railway station is Dehradun (DDN). From there, you can hire a private taxi to reach Raithal."
      },
      {
        title: "Accommodation",
        description: "There are homestays available in Raithal, and you will stay in tents at the campsites."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Raithal (2,240 m)",
        description: "A scenic 7-8 hour drive from Dehradun to Raithal village, which is the base camp. Settle into a homestay and prepare for the trek."
      },
      {
        day: "Day 2",
        title: "Trek from Raithal to Gui (2,800 m)",
        description: "The trek begins with a climb through the village and into a forest of oak and rhododendron to reach the campsite at Gui."
      },
      {
        day: "Day 3",
        title: "Trek from Gui to Dayara Bugyal (3,408 m) and back to Gui",
        description: "An early morning trek to the magnificent Dayara Bugyal. You will spend the day exploring the meadows and the surrounding area before descending back to the campsite at Gui."
      },
      {
        day: "Day 4",
        title: "Trek from Gui to Raithal, Drive back to Dehradun",
        description: "A long descent from Gui to Raithal, followed by the drive back to Dehradun, concluding the trek."
      }
    ],
  },
  



  
  brahmatal: {
    id: "brahmatal",
    title: "Brahmatal Trek: A Winter Wonderland of Frozen Lakes",
    description: "The Brahmatal Trek is a popular winter trek renowned for its pristine alpine lakes and spectacular 360-degree views of some of the Himalayas' most majestic peaks. The trek's name comes from the belief that Lord Brahma meditated here. The trail takes you through dense oak and rhododendron forests, offering a unique opportunity to witness the Garhwal Himalayas blanketed in snow. The two highlights of the trek are the serene Bekaltal Lake and the frozen Brahmatal Lake.",
    image: brahmatal,
    price: 6499,
    difficulty: "Easy to Moderate",
    duration: "6 Days",
    bestTime: [
      {
        season: "Winter (Mid-December to February)",
        description: "This is the most sought-after time. Both Bekaltal and Brahmatal lakes are frozen, and the entire landscape is covered in pristine snow, making for a magical trekking experience.",
        icon: <FaSnowflake />
      },
      {
        season: "Autumn (September to November)",
        description: "The skies are clear, offering the best views of Mt. Trishul and Mt. Nanda Ghunti. The meadows are a beautiful mix of green and golden hues.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Bekaltal Lake",
        description: "A stunning lake surrounded by oak and rhododendron forests, which freezes over completely in winter."
      },
      {
        name: "Brahmatal Lake",
        description: "The trek's namesake lake, which is believed to be the meditation spot of Lord Brahma."
      },
      {
        name: "Tilandi Top",
        description: "A high-altitude point that offers panoramic, wide-angle views of Himalayan giants like Mt. Trishul and Mt. Nanda Ghunti."
      },
      {
        name: "Forests",
        description: "The trek is known for its beautiful trails through dense forests of oak, golden oak, and rhododendron."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trek has a gradual ascent and is well-suited for beginners with a moderate fitness level."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Lohajung, which is also the base camp for the Roopkund trek. The nearest railway station is Kathgodam (KGM) or Rishikesh (RKSH). From there, a long scenic drive (8-10 hours) will take you to Lohajung."
      },
      {
        title: "Accommodation",
        description: "You will stay in a guesthouse at Lohajung and in alpine tents at the campsites."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Rishikesh/Kathgodam to Lohajung (2,300 m)",
        description: "A long and beautiful drive to Lohajung, passing through various villages and hills. Settle into a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Lohajung to Bekaltal (2,750 m)",
        description: "The trek begins with a climb through dense forests of oak and rhododendron to reach the campsite near the beautiful Bekaltal Lake."
      },
      {
        day: "Day 3",
        title: "Trek from Bekaltal to Brahmatal (3,180 m)",
        description: "The trail continues through forests, passing by scenic views. The final stretch leads to the Brahmatal campsite, located near the frozen lake."
      },
      {
        day: "Day 4",
        title: "Trek to Brahmatal Top (3,750 m) and back to Daldam",
        description: "This is the summit day. A moderate to steep climb takes you to Brahmatal Top, offering spectacular views of Trishul and Nanda Ghunti. You'll then descend to the Daldam campsite."
      },
      {
        day: "Day 5",
        title: "Trek from Daldam to Lohajung",
        description: "The final trekking day is a long descent from Daldam back to Lohajung."
      },
      {
        day: "Day 6",
        title: "Drive from Lohajung back to Rishikesh/Kathgodam",
        description: "An early morning drive back, concluding the trek."
      }
    ]
  },
  
  // Small Treks (1-5 Days)
  nagtibba: {
    id: "nagtibba",
    title: "Nag Tibba Trek: A Perfect Weekend Getaway",
    description: "The Nag Tibba Trek is a short, easy, and highly popular weekend trek in the Garhwal Himalayas. It's a great introduction to Himalayan trekking, offering a rewarding experience without requiring an extensive time commitment. The trail is known for its beautiful pine and oak forests, diverse landscapes, and a summit that provides a panoramic view of the Bandarpunch, Kedarnath, and Swargarohini peaks.",
    image: nagtibbatrek, // Placeholder - replace with actual image
    price: 3999,
    difficulty: "Easy",
    duration: "2 Days",
    bestTime: [
      {
        season: "Winter (December to March)",
        description: "Nag Tibba is famous for its winter treks. The entire trail is covered in snow, making it a thrilling and magical experience.",
        icon: <FaSnowflake />
      },
      {
        season: "Summer (April to June)",
        description: "The weather is pleasant, and the trail is lush and green, offering a comfortable trekking experience with clear views.",
        icon: <FaSun />
      },
      {
        season: "Monsoon (July to September)",
        description: "The hills are vibrant and green, but the trail can be slippery. The views may be obstructed by clouds.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Nag Tibba Summit",
        description: "The highest point of the trek, offering breathtaking views of the Himalayan ranges."
      },
      {
        name: "Diverse Forests",
        description: "The trail takes you through beautiful forests of pine, deodar, and rhododendron."
      },
      {
        name: "Nag Devta Temple",
        description: "A small temple dedicated to the Serpent God, which is believed to protect the local villagers."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy. The trek is suitable for beginners and families and can be done without a high level of fitness."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Panthwari village. The nearest city is Dehradun, which is a 3-4 hour drive from Panthwari."
      },
      {
        title: "Accommodation",
        description: "You will stay in alpine tents at the campsite. Homestays are also available in Panthwari village."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Pantwari, Trek to Nag Tibba Base Camp (2,200 m)",
        description: "A morning drive from Dehradun to Pantwari village. The trek starts with a gradual climb through the village and into a forest to reach the Nag Tibba Base Camp."
      },
      {
        day: "Day 2",
        title: "Summit Nag Tibba (3,022 m), Descend to Panthwari, Drive back to Dehradun",
        description: "An early morning climb to the Nag Tibba summit for sunrise views. After spending some time at the top, you will descend all the way back to Panthwari and then drive back to Dehradun."
      }
    ]
  },
  
  choptachandrashila: {
    id: "choptachandrashila",
    title: "Chopta Chandrashila Trek: The Ultimate Himalayan Summit",
    description: "The Chopta Chandrashila Trek is a popular and relatively easy trek that takes you to two sacred sites: the Tungnath Temple, the highest Shiva temple in the world, and the Chandrashila Summit. The trek is famous for its stunning 360-degree views of prominent Himalayan peaks from the summit, including Nanda Devi, Trishul, and Chaukhamba. The trek is accessible year-round, with each season offering a unique experience.",
    image: chandrsilla, // Placeholder - replace with actual image
    price: 4999,
    difficulty: "Easy to Moderate",
    duration: "4 Days",
    bestTime: [
      {
        season: "Summer (April to June)",
        description: "Pleasant weather and clear skies make this an ideal time for trekking. The rhododendron flowers bloom, adding a splash of color to the trail.",
        icon: <FaSun />
      },
      {
        season: "Monsoon (July to September)",
        description: "The trek becomes exceptionally green and the hillsides are covered in lush vegetation. However, the views can be obscured by clouds, and the trail can be slippery.",
        icon: <FaLeaf />
      },
      {
        season: "Winter (November to March)",
        description: "The region receives heavy snowfall, and the trail is transformed into a winter wonderland. It becomes a more challenging and adventurous trek.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "Tungnath Temple",
        description: "The highest Shiva temple in the world and one of the Panch Kedar temples."
      },
      {
        name: "Chandrashila Summit",
        description: "The summit offers a spectacular, unobstructed 360-degree view of the Garhwal and Kumaon Himalayas."
      },
      {
        name: "Deoriatal Lake",
        description: "Many itineraries include a trek to this serene lake, which offers stunning views of Mt. Chaukhamba."
      },
      {
        name: "Chopta: The 'Mini Switzerland of India'",
        description: "The vast, beautiful meadows of Chopta serve as the base camp for the trek and are a sight to behold."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trek has a gradual ascent and is suitable for beginners with basic fitness."
      },
      {
        title: "How to Reach",
        description: "Chopta is approximately 225 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Chopta."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses and camps are available in Chopta. During the trek, you can stay in tents or the dharamshala near Tungnath temple."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Chopta",
        description: "A scenic 7-8 hour drive from Dehradun to Chopta (2,700m). Overnight stay in Chopta."
      },
      {
        day: "Day 2",
        title: "Trek from Chopta to Tungnath and Chandrashila, return to Chopta",
        description: "Early morning 4 km trek to Tungnath temple, followed by a 1.5 km climb to Chandrashila peak. Enjoy the panoramic views before returning to Chopta."
      },
      {
        day: "Day 3",
        title: "Drive from Chopta to Dehradun",
        description: "After breakfast, drive back to Dehradun, completing your journey."
      }
    ]
  },
  
  rupinpass: {
    id: "rupinpass",
    title: "Rupin Pass Trek: The Waterfall Trail",
    description: "A challenging trek crossing from Uttarakhand to Himachal Pradesh, featuring stunning waterfalls, hanging villages, and snow bridges.",
    image: rupinPass, // Placeholder - replace with actual image
    price: 8999,
    difficulty: "Difficult",
    duration: "8 Days",
    bestTime: [
      {
        season: "Spring (March to May)",
        description: "Blooming rhododendrons add vibrant colors to the landscape, and the weather is pleasant for trekking.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "Clear skies offer the best views of the Chaukhamba peaks reflected in the lake waters.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Deoria Tal Lake",
        description: "A beautiful emerald lake at 2,438 meters offering perfect reflections of the Chaukhamba peaks."
      },
      {
        name: "Chaukhamba Views",
        description: "Spectacular views of the Chaukhamba massif and other Himalayan peaks."
      },
      {
        name: "Rich Biodiversity",
        description: "The trek passes through dense forests with diverse flora and fauna, including various bird species."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy. The trek is short and suitable for beginners, families, and even children."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Sari village, which is approximately 200 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Sari."
      },
      {
        title: "Accommodation",
        description: "Basic homestays are available in Sari village. At Deoriatal, you can stay in tents provided by trek operators."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Sari and Trek to Deoriatal",
        description: "After a 6-7 hour drive to Sari village, begin your short 2 km trek to Deoriatal. Set up camp by the lake and enjoy the sunset views."
      },
      {
        day: "Day 2",
        title: "Explore Deoriatal and Return to Dehradun",
        description: "Wake up early to catch the sunrise and the perfect reflection of mountains in the lake. After breakfast, trek back to Sari and drive to Dehradun."
      }
    ]
  },

  hamptaPass: {
  id: "hamptaPass",
  title: "Hampta Pass Trek: A Crossover to Lahaul",
  description:
    "Hampta Pass is one of Himachal's most popular crossover treks, connecting lush green Kullu Valley with the stark deserts of Lahaul. The trek features forests, meadows, glaciers, and the stunning Chandratal Lake.",
  image: hamptaPass,
  price: 20000,
  difficulty: "Moderate",
  duration: "5 Days",
  bestTime: [
    {
      season: "June to September",
      description: "The most popular time to cross the pass with clear trails, moderate snow, and pleasant trekking weather.",
      icon: <FaSun />
    },
    {
      season: "May",
      description: "Snow still covers parts of the trail, making the trek more challenging but rewarding for adventure seekers.",
      icon: <FaSnowflake />
    }
  ],
  attractions: [
    {
      name: "Chandratal Lake",
      description: "A stunning high-altitude lake often visited at the end of the trek, famous for its turquoise waters."
    },
    {
      name: "Crossover from Kullu to Lahaul",
      description: "Experience the dramatic landscape shift from lush green valleys to barren, stark mountains."
    },
    {
      name: "Balu Ka Ghera Meadow",
      description: "A vast campsite surrounded by snowy peaks, perfect for stargazing."
    },
    {
      name: "Shea Goru Campsite",
      description: "A beautiful campsite on the Lahaul side of the pass, with stunning views."
    }
  ],
  tips: [
    {
      title: "Snow Conditions",
      description: "In May and June, the pass may have heavy snow. Crampons and proper gear may be required."
    },
    {
      title: "Permits",
      description: "Trek permits are required and usually arranged by trekking agencies."
    },
    {
      title: "Starting Point",
      description: "The trek begins at Jobra, near Manali, which is easily accessible by road."
    }
  ],
  itinerary: [
    {
      day: "Day 1",
      title: "Drive from Manali to Jobra, trek to Jwara (3,300 m)",
      description: "A short drive to Jobra, followed by an easy trek through pine forests and meadows to Jwara."
    },
    {
      day: "Day 2",
      title: "Trek to Balu Ka Ghera (3,700 m)",
      description: "Trek along the Rani Nallah stream and through flower-filled meadows to reach the wide campsite of Balu Ka Ghera."
    },
    {
      day: "Day 3",
      title: "Climb to Hampta Pass (4,270 m), descend to Shea Goru",
      description: "A challenging climb to the pass followed by a steep descent into the Lahaul valley to Shea Goru."
    },
    {
      day: "Day 4",
      title: "Descend to Chhatru, optional drive to Chandratal",
      description: "Trek down to Chhatru and drive towards Chandratal Lake if the road is open."
    },
    {
      day: "Day 5",
      title: "Drive back to Manali",
      description: "Return journey to Manali, concluding the trek."
    }
  ]
},

  
  pindariglacier: {
    id: "pindariglacier",
    title: "Pindari Glacier Trek: Gateway to the Himalayas",
    description: "A classic trek to one of the most accessible glaciers in the Kumaon region, offering stunning views of Nanda Devi and Nanda Kot peaks.",
    image: pindariGlacier, // Placeholder - replace with actual image
    price: 7499,
    difficulty: "Moderate",
    duration: "6 Days",
    bestTime: [
      {
        season: "Spring (April to June)",
        description: "The meadows are lush green with blooming wildflowers, creating a vibrant landscape.",
        icon: <FaSun />
      },
      {
        season: "Winter (December to February)",
        description: "The meadows transform into a snow-covered wonderland, perfect for snow activities and photography.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "Dayara Bugyal Meadows",
        description: "One of the most beautiful high-altitude meadows in India, spanning over 28 square kilometers at an elevation of 3,048 meters."
      },
      {
        name: "Himalayan Panorama",
        description: "Stunning views of major Himalayan peaks including Bandarpunch, Srikanth, and Black Peak."
      },
      {
        name: "Barnala Tal",
        description: "A small picturesque lake en route to the main meadows, perfect for a peaceful break."
      },
      {
        name: "Winter Skiing",
        description: "During winter, the meadows become a popular skiing destination with gentle slopes perfect for beginners."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trek has a gradual ascent and is suitable for beginners with basic fitness."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Barsu village, which is approximately 180 km from Dehradun. You can hire a taxi from Dehradun to reach Barsu."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Barsu village. During the trek, you will stay in tents at Barnala and Dayara Bugyal."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Barsu",
        description: "A scenic 7-8 hour drive from Dehradun to Barsu village (2,100m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Barsu to Barnala",
        description: "A 5 km trek through oak and rhododendron forests to reach Barnala campsite (2,400m). Visit Barnala Tal lake in the evening."
      },
      {
        day: "Day 3",
        title: "Trek from Barnala to Dayara Bugyal and Explore",
        description: "A 3 km trek to reach the vast Dayara Bugyal meadows (3,048m). Spend the day exploring the meadows and enjoying panoramic mountain views."
      },
      {
        day: "Day 4",
        title: "Trek from Dayara Bugyal to Barsu and Drive to Dehradun",
        description: "Descend back to Barsu village and drive to Dehradun, completing your journey."
      }
    ]
  },
  
  gaumukhtapovan: {
    id: "gaumukhtapovan",
    title: "Gaumukh Tapovan Trek: Source of the Ganges",
    description: "A spiritual journey to the source of the holy Ganges river, with stunning views of Mt. Shivling and the Bhagirathi peaks.",
    image: gaumukhTapovan, // Placeholder - replace with actual image
    price: 8999,
    difficulty: "Difficult",
    duration: "8 Days",
    bestTime: [
      {
        season: "Winter (December to February)",
        description: "The entire trail is covered in snow, offering a true winter trekking experience with clear views of major peaks.",
        icon: <FaSnowflake />
      },
      {
        season: "Spring (March to April)",
        description: "The snow begins to melt, revealing beautiful rhododendron blooms and clearer trails.",
        icon: <FaSun />
      }
    ],
    attractions: [
      {
        name: "Brahmatal Lake",
        description: "A beautiful alpine lake at 3,734 meters, often frozen during winter months."
      },
      {
        name: "Bekaltal Lake",
        description: "Another picturesque lake encountered during the trek, surrounded by oak and rhododendron forests."
      },
      {
        name: "Himalayan Views",
        description: "Stunning views of Mt. Trishul, Nanda Ghunti, and other Himalayan peaks from various points on the trek."
      },
      {
        name: "Ali Bugyal and Bedni Bugyal",
        description: "Distant views of these famous twin meadows from the Brahmatal summit."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek involves some steep climbs and can be challenging in snow conditions."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Lohajung, which is approximately 230 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Lohajung."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Lohajung. During the trek, you will stay in tents at Bekaltal and Brahmatal."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Lohajung",
        description: "A long 10-11 hour drive from Dehradun to Lohajung (2,300m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Lohajung to Bekaltal",
        description: "A 6 km trek through rhododendron and oak forests to reach Bekaltal campsite (2,740m)."
      },
      {
        day: "Day 3",
        title: "Trek from Bekaltal to Brahmatal",
        description: "A 7 km trek passing through Khamila Top to reach Brahmatal campsite (3,250m). Visit Brahmatal lake in the evening."
      },
      {
        day: "Day 4",
        title: "Trek to Brahmatal Top, descend to Lohajung, and drive to Dehradun",
        description: "Early morning trek to Brahmatal Top (3,734m) for panoramic views, then descend to Lohajung and drive back to Dehradun."
      }
    ]
  },
  
  valleyofflowers: {
    id: "valleyofflowers",
    title: "Valley of Flowers Trek: Floral Paradise",
    description: "A UNESCO World Heritage Site, this trek takes you through a vibrant valley filled with hundreds of rare and exotic Himalayan flowers, alpine meadows, and stunning mountain views.",
    image: valleyOfFlower, // Placeholder - replace with actual image
    price: 6999,
    difficulty: "Moderate",
    duration: "5 Days",
    bestTime: [
      {
        season: "Monsoon (July to September)",
        description: "The valley is in full bloom during these months, with July and August being the peak flowering season.",
        icon: <FaSun />
      }
    ],
    attractions: [
      {
        name: "Valley of Flowers National Park",
        description: "A UNESCO World Heritage Site spanning 87.5 sq km, home to over 500 species of wild flowers, rare medicinal herbs, and endangered wildlife."
      },
      {
        name: "Hemkund Sahib",
        description: "A sacred Sikh shrine located at an altitude of 4,329 meters beside a glacial lake, often included in the itinerary."
      },
      {
        name: "Pushpawati River",
        description: "A beautiful river flowing through the valley, adding to its scenic beauty."
      },
      {
        name: "Rare Flora and Fauna",
        description: "Spot rare Himalayan flowers like the Blue Poppy, Brahmakamal, and wildlife including Himalayan black bears, snow leopards, and musk deer."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek involves some steep climbs, particularly to Hemkund Sahib, and walking on uneven terrain."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Govindghat, which is approximately 300 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Govindghat."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses and dharamshalas are available in Govindghat and Ghangaria. No overnight stay is allowed inside the Valley of Flowers."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Govindghat",
        description: "A long 10-11 hour drive from Dehradun to Govindghat (1,828m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Govindghat to Ghangaria",
        description: "A 14 km trek along the Pushpawati River to reach Ghangaria (3,048m), the base camp for both Valley of Flowers and Hemkund Sahib."
      },
      {
        day: "Day 3",
        title: "Explore Valley of Flowers",
        description: "A 4 km trek from Ghangaria to enter the Valley of Flowers National Park. Spend the day exploring the valley and return to Ghangaria by evening."
      },
      {
        day: "Day 4",
        title: "Visit Hemkund Sahib and return to Ghangaria",
        description: "A steep 6 km trek to Hemkund Sahib (4,329m). Visit the gurudwara and the glacial lake before returning to Ghangaria."
      },
      {
        day: "Day 5",
        title: "Trek from Ghangaria to Govindghat and drive to Dehradun",
        description: "Descend back to Govindghat and drive to Dehradun, completing your journey."
      }
    ]
  },
  
  dodital: {
    id: "dodital",
    title: "Dodital Trek: Serene Lake Journey",
    description: "A serene trek to a beautiful freshwater lake, believed to be Lord Ganesha's birthplace, surrounded by dense forests and offering a peaceful retreat in the Himalayas.",
    image: dodital, // Placeholder - replace with actual image
    price: 4999,
    difficulty: "Easy to Moderate",
    duration: "4 Days",
    bestTime: [
      {
        season: "Spring (April to June)",
        description: "Pleasant weather with blooming rhododendrons and clear views make this an ideal time for the trek.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "Clear skies and comfortable temperatures offer great trekking conditions and views.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Dodital Lake",
        description: "A beautiful freshwater lake at 3,307 meters, surrounded by oak and pine forests, believed to be the birthplace of Lord Ganesha."
      },
      {
        name: "Darwa Pass",
        description: "For those extending their trek, this pass at 4,150 meters offers stunning views of the Bandarpunch range."
      },
      {
        name: "Rich Biodiversity",
        description: "The trek passes through the Govind Wildlife Sanctuary, home to various Himalayan wildlife and bird species."
      },
      {
        name: "Assi Ganga Valley",
        description: "The beautiful valley through which the trek passes, offering scenic views and peaceful surroundings."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Easy to Moderate. The trek has a gradual ascent and is suitable for beginners with basic fitness."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Sangamchatti, which is approximately 180 km from Dehradun. You can hire a taxi from Dehradun to reach Sangamchatti via Uttarkashi."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Sangamchatti. During the trek, you can stay in forest rest houses at Bebra and Dodital, or in tents."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Sangamchatti",
        description: "A 7-8 hour drive from Dehradun to Sangamchatti (1,600m) via Uttarkashi. Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Sangamchatti to Bebra",
        description: "A 5 km trek through dense forests along the Assi Ganga River to reach Bebra (2,300m)."
      },
      {
        day: "Day 3",
        title: "Trek from Bebra to Dodital",
        description: "A 6 km trek through oak and rhododendron forests to reach Dodital (3,307m). Explore the lake and its surroundings."
      },
      {
        day: "Day 4",
        title: "Trek from Dodital to Sangamchatti and drive to Dehradun",
        description: "Descend back to Sangamchatti and drive to Dehradun, completing your journey."
      }
    ]
  },
  
  kuaripass: {
    id: "kuaripass",
    title: "Kuari Pass Trek: Lord Curzon's Trail",
    description: "Known as Lord Curzon's Trail, this trek offers some of the most magnificent views of the Greater Himalayan ranges, including Nanda Devi, India's second-highest peak.",
    image: kuariPass1, // Placeholder - replace with actual image
    price: 5999,
    difficulty: "Moderate",
    duration: "5 Days",
    bestTime: [
      {
        season: "Spring (April to June)",
        description: "Pleasant weather with blooming rhododendrons and clear mountain views.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "Clear skies offer the best panoramic views of the Himalayan peaks.",
        icon: <FaLeaf />
      },
      {
        season: "Winter (December to February)",
        description: "Snow-covered landscapes transform the trek into a winter wonderland, though more challenging.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "Kuari Pass",
        description: "A high mountain pass at 3,640 meters offering panoramic views of major Himalayan peaks."
      },
      {
        name: "Himalayan Panorama",
        description: "Stunning views of peaks like Nanda Devi, Dronagiri, Kamet, Hathi-Ghodi Parvat, and Chaukhamba."
      },
      {
        name: "Auli Meadows",
        description: "Beautiful alpine meadows near the famous ski resort of Auli."
      },
      {
        name: "Gorson Bugyal",
        description: "A vast high-altitude meadow offering spectacular views and camping experiences."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek involves some steep climbs and can be challenging in snow conditions."
      },
      {
        title: "How to Reach",
        description: "The trek typically starts from Joshimath or Auli, which is approximately 250 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Joshimath."
      },
      {
        title: "Accommodation",
        description: "Hotels and guesthouses are available in Joshimath and Auli. During the trek, you will stay in tents at various campsites."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Joshimath",
        description: "A 10-11 hour drive from Dehradun to Joshimath (1,875m). Overnight stay in a hotel."
      },
      {
        day: "Day 2",
        title: "Drive to Dhak and trek to Gulling",
        description: "A short drive to Dhak village followed by a 4 km trek to Gulling campsite (2,350m)."
      },
      {
        day: "Day 3",
        title: "Trek from Gulling to Khullara",
        description: "A 6 km trek through forests and meadows to reach Khullara campsite (3,100m), offering beautiful views of the Himalayan peaks."
      },
      {
        day: "Day 4",
        title: "Trek to Kuari Pass and return to Khullara",
        description: "A 7 km round trip to Kuari Pass (3,640m) for panoramic views of the Greater Himalayas, then return to Khullara for overnight stay."
      },
      {
        day: "Day 5",
        title: "Trek from Khullara to Dhak and drive to Dehradun",
        description: "Descend back to Dhak village and drive to Dehradun, completing your journey."
      }
    ]
  },
  
  phulararidge: {
    id: "phulararidge",
    title: "Phulara Ridge Trek: Panoramic Ridge Walk",
    description: "Known as one of India's best ridge treks, offering continuous panoramic views as you walk along a magnificent ridge with the Himalayas spread out on both sides.",
    image: pularaRidge, // Placeholder - replace with actual image
    price: 5499,
    difficulty: "Moderate",
    duration: "4 Days",
    bestTime: [
      {
        season: "Spring (May to June)",
        description: "Pleasant weather with clear views and blooming wildflowers in the meadows.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to October)",
        description: "Clear skies offer the best panoramic views of the Himalayan peaks.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Phulara Ridge",
        description: "A magnificent 4 km long ridge at 3,500 meters offering 360-degree views of the Himalayas."
      },
      {
        name: "Pushtara Bugyal",
        description: "Beautiful alpine meadows with grazing horses and cattle, surrounded by oak and rhododendron forests."
      },
      {
        name: "Himalayan Panorama",
        description: "Stunning views of peaks like Bandarpunch, Swargarohini, Kalanag, and the Gangotri range."
      },
      {
        name: "Descending Valleys",
        description: "Beautiful views of the descending valleys on both sides of the ridge."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek involves some steep climbs and ridge walking requires good balance."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Sankri, which is approximately 200 km from Dehradun. You can hire a taxi from Dehradun to reach Sankri."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Sankri. During the trek, you will stay in tents at various campsites."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Sankri",
        description: "A 8-9 hour drive from Dehradun to Sankri (1,950m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Sankri to Pushtara",
        description: "A 6 km trek through dense forests and meadows to reach Pushtara campsite (2,800m)."
      },
      {
        day: "Day 3",
        title: "Trek from Pushtara to Phulara Ridge and descend to Bhangeli",
        description: "A 9 km trek ascending to Phulara Ridge (3,500m) and walking along it, enjoying panoramic views, before descending to Bhangeli campsite (2,500m)."
      },
      {
        day: "Day 4",
        title: "Trek from Bhangeli to Taluka and drive to Dehradun",
        description: "A 5 km trek to Taluka, followed by a drive back to Dehradun, completing your journey."
      }
    ]
  },
  
  alibednibugyal: {
    id: "alibednibugyal",
    title: "Ali Bedni Bugyal Trek: Twin Meadows Expedition",
    description: "A trek through two vast and grand alpine meadows, Ali and Bedni Bugyal, offering some of the most beautiful high-altitude grasslands in India with panoramic views of major Himalayan peaks.",
    image:  aliBedniBugyal, // Placeholder - replace with actual image
    price: 5999,
    difficulty: "Moderate",
    duration: "5 Days",
    bestTime: [
      {
        season: "Spring (April to June)",
        description: "The meadows are lush green with blooming wildflowers, creating a vibrant landscape.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "Clear skies offer the best views of the Himalayan peaks surrounding the meadows.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Ali Bugyal",
        description: "One of Asia's largest high-altitude meadows at 3,400 meters, spanning several kilometers."
      },
      {
        name: "Bedni Bugyal",
        description: "Another vast meadow at 3,350 meters with a small lake, Bedni Kund, considered sacred."
      },
      {
        name: "Himalayan Panorama",
        description: "Stunning views of peaks like Trishul, Nanda Ghunti, Chaukhamba, and Neelkanth."
      },
      {
        name: "Wan Village",
        description: "A beautiful traditional Garhwali village with unique architecture and culture."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek involves some steep climbs but is generally manageable for beginners with good fitness."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Lohajung, which is approximately 230 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Lohajung."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Lohajung. During the trek, you will stay in tents at various campsites."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Lohajung",
        description: "A 10-11 hour drive from Dehradun to Lohajung (2,300m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Lohajung to Didina",
        description: "A 6 km trek through oak and rhododendron forests to reach Didina village (2,400m)."
      },
      {
        day: "Day 3",
        title: "Trek from Didina to Bedni Bugyal via Ali Bugyal",
        description: "A 7 km trek ascending to Ali Bugyal (3,400m) and then traversing to Bedni Bugyal (3,350m), exploring both meadows."
      },
      {
        day: "Day 4",
        title: "Trek from Bedni Bugyal to Wan",
        description: "A 6 km descent through forests to reach Wan village (2,500m)."
      },
      {
        day: "Day 5",
        title: "Drive from Wan to Dehradun",
        description: "A long drive back to Dehradun, completing your journey."
      }
    ]
  },
  
  // Long Treks
  
  roopkund: {
    id: "roopkund",
    title: "Roopkund Trek: Mystery Lake Expedition",
    description: "A challenging trek to the famous 'Skeleton Lake', a high-altitude glacial lake containing skeletal remains from the 9th century, surrounded by snow-capped peaks and pristine meadows.",
    image: roopkund, // Placeholder - replace with actual image
    price: 8999,
    difficulty: "Moderate to Difficult",
    duration: "7 Days",
    bestTime: [
      {
        season: "Pre-Monsoon (May to June)",
        description: "Pleasant weather with clear views and blooming wildflowers in the meadows.",
        icon: <FaSun />
      },
      {
        season: "Post-Monsoon (September to October)",
        description: "Clear skies offer the best views of the Himalayan peaks and the lake is usually free of snow.",
        icon: <FaLeaf />
      }
    ],
    attractions: [
      {
        name: "Roopkund Lake",
        description: "A mysterious glacial lake at 5,029 meters containing skeletal remains, believed to be from a 9th-century catastrophic event."
      },
      {
        name: "Ali and Bedni Bugyal",
        description: "Two of the most beautiful high-altitude meadows in India, spanning several kilometers."
      },
      {
        name: "Junargali Pass",
        description: "A ridge just above Roopkund at 5,250 meters offering spectacular views of the Trishul massif."
      },
      {
        name: "Himalayan Panorama",
        description: "Stunning views of peaks like Trishul, Nanda Ghunti, and Chaukhamba throughout the trek."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate to Difficult. The trek involves steep climbs at high altitudes and can be challenging in snow conditions."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Lohajung, which is approximately 230 km from Dehradun. You can hire a taxi from Dehradun or Rishikesh to reach Lohajung."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Lohajung. During the trek, you will stay in tents at various campsites."
      },
      {
        title: "Note",
        description: "The route to Roopkund Lake is currently restricted by authorities. Check the latest regulations before planning your trek."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Lohajung",
        description: "A 10-11 hour drive from Dehradun to Lohajung (2,300m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Lohajung to Didina",
        description: "A 6 km trek through oak and rhododendron forests to reach Didina village (2,400m)."
      },
      {
        day: "Day 3",
        title: "Trek from Didina to Bedni Bugyal via Ali Bugyal",
        description: "A 7 km trek ascending to Ali Bugyal (3,400m) and then traversing to Bedni Bugyal (3,350m), exploring both meadows."
      },
      {
        day: "Day 4",
        title: "Trek from Bedni Bugyal to Patar Nachauni",
        description: "A 4 km trek to Patar Nachauni campsite (3,800m), gradually gaining altitude."
      },
      {
        day: "Day 5",
        title: "Trek from Patar Nachauni to Bhagwabasa",
        description: "A 4 km trek to Bhagwabasa campsite (4,100m), the last campsite before Roopkund."
      },
      {
        day: "Day 6",
        title: "Trek to Roopkund and back to Bedni Bugyal",
        description: "An early morning 3 km steep ascent to Roopkund Lake (5,029m), with an optional climb to Junargali Pass (5,250m). Return to Bedni Bugyal for overnight stay."
      },
      {
        day: "Day 7",
        title: "Trek from Bedni Bugyal to Lohajung and drive to Dehradun",
        description: "A 11 km descent to Lohajung, followed by a drive back to Dehradun, completing your journey."
      }
    ]
  },
  
  harkidun: {
    id: "harkidun",
    title: "Har Ki Dun Trek: Valley of Gods",
    description: "A classic trek through ancient villages and pristine alpine scenery to a cradle-shaped valley surrounded by snow-capped peaks, rich in mythology and traditional Himalayan culture.",
    image: hariKiDun, // Placeholder - replace with actual image
    price: 7999,
    difficulty: "Moderate",
    duration: "7 Days",
    bestTime: [
      {
        season: "Spring (April to June)",
        description: "Pleasant weather with blooming wildflowers and clear views of the surrounding peaks.",
        icon: <FaSun />
      },
      {
        season: "Autumn (September to November)",
        description: "Clear skies offer the best views of the Himalayan peaks and comfortable trekking temperatures.",
        icon: <FaLeaf />
      },
      {
        season: "Winter (December to March)",
        description: "Snow-covered landscapes transform the valley into a winter wonderland, though more challenging to trek.",
        icon: <FaSnowflake />
      }
    ],
    attractions: [
      {
        name: "Har Ki Dun Valley",
        description: "A cradle-shaped valley at 3,566 meters surrounded by snow-capped peaks, rich in mythology and natural beauty."
      },
      {
        name: "Ancient Villages",
        description: "Traditional villages like Osla and Gangad with unique architecture and culture dating back to the Mahabharata era."
      },
      {
        name: "Jaundhar Glacier Views",
        description: "Distant views of the Jaundhar Glacier and peaks like Swargarohini, Bandarpunch, and Black Peak."
      },
      {
        name: "Rich Biodiversity",
        description: "The trek passes through the Govind Wildlife Sanctuary, home to various Himalayan wildlife and bird species."
      }
    ],
    tips: [
      {
        title: "Difficulty",
        description: "Moderate. The trek has a gradual ascent and is suitable for beginners with good fitness."
      },
      {
        title: "How to Reach",
        description: "The trek starts from Sankri, which is approximately 200 km from Dehradun. You can hire a taxi from Dehradun to reach Sankri."
      },
      {
        title: "Accommodation",
        description: "Basic guesthouses are available in Sankri. During the trek, you can stay in forest rest houses, basic lodges in villages, or in tents."
      },
      {
        title: "Permits",
        description: "Trekking permits are required as the trek passes through the Govind Wildlife Sanctuary. These can be obtained in Sankri."
      }
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Drive from Dehradun to Sankri",
        description: "A 8-9 hour drive from Dehradun to Sankri (1,950m). Overnight stay in a guesthouse."
      },
      {
        day: "Day 2",
        title: "Trek from Sankri to Pauni Garaat",
        description: "A 12 km trek through dense pine forests and alongside the Supin River to reach Pauni Garaat (2,400m)."
      },
      {
        day: "Day 3",
        title: "Trek from Pauni Garaat to Kalkattiyadhar",
        description: "A 5 km trek passing through Osla village to reach Kalkattiyadhar campsite (3,100m)."
      },
      {
        day: "Day 4",
        title: "Trek from Kalkattiyadhar to Har Ki Dun",
        description: "A 6 km trek to finally reach the beautiful Har Ki Dun valley (3,566m). Explore the valley and enjoy the views."
      },
      {
        day: "Day 5",
        title: "Explore Har Ki Dun and optional hike to Jaundhar Glacier base",
        description: "Spend the day exploring the valley and optionally hike towards the base of Jaundhar Glacier for closer views of the peaks."
      },
      {
        day: "Day 6",
        title: "Trek from Har Ki Dun to Osla",
        description: "Begin the return journey with a 10 km trek to Osla village (2,560m). Explore this ancient village with unique architecture."
      },
      {
        day: "Day 7",
        title: "Trek from Osla to Sankri and drive to Dehradun",
        description: "A 13 km trek back to Sankri, followed by a drive to Dehradun, completing your journey."
      }
    ]
  }
};

const TourDetail = () => {
  const { tourId } = useParams();
  const tour = tourData[tourId];

  if (!tour) {
    return (
      <div className="container py-5 text-center">
        <h2>Tour not found</h2>
        <p>The tour you're looking for doesn't exist or has been removed.</p>
        <Link to="/tour-listings" className="btn btn-primary mt-3">
          Back to Tour Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="tour-detail-container">
      {/* Hero Section */}
      <div className="tour-hero" style={{ backgroundImage: `url(${tour.image})` }}>
        <div className="overlay"></div>
        <div className="container">
          <h1 className="tour-title">{tour.title}</h1>
          <div className="tour-meta">
            <span><FaMountain /> {tour.difficulty}</span>
            <span><FaCalendarAlt /> {tour.duration}</span>
            <span><FaMapMarkerAlt /> Uttarakhand, India</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          {/* Left Column - Main Content */}
          <div className="col-lg-8">
            {/* Overview */}
            <section className="tour-section">
              <h2 className="section-title">Overview</h2>
              <p className="tour-description">{tour.description}</p>
            </section>

            {/* Best Time to Visit */}
            <section className="tour-section">
              <h2 className="section-title">Best Time to Visit: A Seasonal Guide</h2>
              <div className="season-cards">
                {tour.bestTime.map((season, index) => (
                  <div className="season-card" key={index}>
                    <div className="season-icon">{season.icon}</div>
                    <h3 className="season-title">{season.season}</h3>
                    <p className="season-description">{season.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Attractions */}
            <section className="tour-section">
              <h2 className="section-title">Top Attractions and Experiences</h2>
              <div className="attractions-list">
                {tour.attractions.map((attraction, index) => (
                  <div className="attraction-item" key={index}>
                    <h3 className="attraction-title">{attraction.name}</h3>
                    <p className="attraction-description">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="tour-section">
              <h2 className="section-title">Kedarkantha Trek Itinerary ({tour.duration})</h2>
              <div className="itinerary-timeline">
                {tour.itinerary.map((day, index) => (
                  <div className="itinerary-day" key={index}>
                    <div className="day-marker">{day.day}</div>
                    <div className="day-content">
                      <h3 className="day-title">{day.title}</h3>
                      <p className="day-description">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-lg-4">
            <div className="tour-sidebar">
              {/* Price Card */}
              <div className="price-card">
                <h3 className="price-value">₹{tour.price.toLocaleString()}</h3>
                <p className="price-per">per person</p>
                <Link to="/book-now" className="btn btn-primary btn-book">Book Now</Link>
              </div>

              {/* Traveler's Tips */}
              <div className="tips-card">
                <h3 className="tips-title">Traveler's Tips</h3>
                <ul className="tips-list">
                  {tour.tips.map((tip, index) => (
                    <li key={index}>
                      <strong>{tip.title}:</strong> {tip.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need Help */}
              <div className="help-card">
                <h3 className="help-title">Need Help?</h3>
                <p>Have questions about this trek? Our travel experts are ready to assist you.</p>
                <Link to="/contact" className="btn btn-outline-primary">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TourDetail;









