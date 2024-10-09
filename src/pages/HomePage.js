// src/pages/HomePage.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import './HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Modal from '../components/Modal'; // Adjust the path as necessary.
import Footer from '../components/Footer'; // Import the Footer component

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const deals = [
    {
      name : "Makemy trip",
      image: "https://gos3.ibcdn.com/img-1575286289.jpg",
      description : "Winter Flight Sale!"
    },
    {
      name : "Bali",
      image : "https://i.ytimg.com/vi/CCOvZyjDqCE/maxresdefault.jpg",
      description : "FULL 5-Day Bali 🇮🇩 Travel Itinerary by AI!"
    },
   
    
    {
      name: "Dubai",
      image: "https://loyaltylobby.com/wp-content/uploads/2024/04/Aegean-Dubai-Flight-Discount.png",
      description: "Exclusive deal: UpTo 50% off Dubai Sky's.",
    },
    {
      name: "Free Adventure",
      image: "https://img.freepik.com/free-vector/wild-nature-exploring-banner-template_23-2148943835.jpg",
      description: "Exclusive deal: Only For Some User For Every Year Date Announced Soon! And winners Also Soon! Stay Tuned For Winners",
    },
    {
      name: "Maldives",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/598882586.jpg?k=6238fcbced199327b52087823168d06986766db58d20d2c5cd45315be84867ee&o=&hp=1",
      description: "Special offer: 15% discount on Maldives resort bookings.",
    },

  ];

  const popularPlaces = [
    { name: "Bali", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbl8cFZXhX6BSurRHlBvdAoVlHIKU_BdD8_g&s" },
    { name: "Venice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDK9FXLgAWyetLqDsy_EysSHtWmR0aasCVEg&s" },
    { name: "Tokyo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBo4hUbYtSZ7rkL3hRSZbgc5DYEtBXdtDvnw&s" },
    { name: "Rome", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiOygHdGgOja8TiDl8zjyJg8J8kRxsuelLg&s" },
    { name: "London", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOnBEB1gcX9SJstWxWI8U41u6K5GTzbbJDFg&s" },
    { name: "Sydney", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizXxSZDRKsZWYtmCQmMiPp61s0jWcfzGMzQ&s" },
    { name: "Bangkok", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY9P9hW8KOcNt5OA-cGxKU72RKoMckZDFeBA&s" },
    { name: "Amsterdam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJyw2IwJ11Lqf7szlbsPfWfL3i7XjDHf6SsQ&s" },
    { name: "Cairo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ewRa9BlYv5RsBk64Ns8wpPL7Olhrxt-paQ&s" },
    { name: "Barcelona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPpQnpBw3LcyVqjUVteJbORY60T149_sdyA&s" },
  
    // Indian places
    { name: "Taj Mahal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLL2aZoZFpaETAkYMl-4dulwfR8X1t3aUlEw&s" },
    { name: "Goa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5EU3o8TI1tZKRUvkYJmDa8WWBU8bJmX8RrQ&s" },
    { name: "Jaipur", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSxzaw-s4tFSWR-V38nXHqbVzKCHDVWeBHTQ&s" },
    { name: "Kerala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nRwwajw-OQXSCcraP1eEM9JYEg_CrjniiQ&s" },
    { name: "Manali", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRgUX08C7PKVXTc5vaCCi2lQfgwEUTedocPQ&s" },
    { name: "Varanasi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwPcdzJY8jfQim-tIsAh7ND3UuaLqIjTSHg&s" },
    { name: "Rishikesh", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8dK64LhRBealAJWDWnM2jC6tP9rlRHDp1w&s" },
    { name: "Leh", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp9s0ExOZ6ST-pYq3MZX23rrxeM090mGfUsg&s" },
    { name: "Udaipur", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeFlBepK49dwJEAtnSs_ijH51ApD-ObbgR3w&s" },
    { name: "Hampi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2fK88X5GaMQOhoeLci4zVjJXHuE9t7MsAw&s" },
    { name: "New York", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMobIoayWpuXIJbYEdGAx9H9c5Ck3Q85kSuw&s" },
    { name: "Paris", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPK7gzVvAp5IQtgW5OUuTUDyfVZSMU5RvxKQ&s" },
    { name: "Istanbul", image: "https://media.istockphoto.com/id/1283504873/photo/mosque-and-bosphorus-bridge.jpg?s=612x612&w=0&k=20&c=UHyYLC4VVJef9V8vzdJsVwqSjX3N06D2-975j3VoajY=" },
    { name: "Kyoto", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpgkTHeLK4uena9Ae1XJ_jVyXLCxyvAtjgg&s" }
  ];

  const handlePlaceClick = (place) => {
    setSelectedLocation(place);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const PrevArrow = ({ onClick }) => (
    <button className="carousel-arrow prev-arrow" onClick={onClick}>
      <ArrowBackIos style={{ fontSize: '30px', color: '#fff' }} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="carousel-arrow next-arrow" onClick={onClick}>
      <ArrowForwardIos style={{ fontSize: '30px', color: '#fff' }} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="home-page">
      {/* Deals Section */}
      <h2 className="section-title">Deals</h2>
      <Slider {...settings}>
        {deals.map((deal, index) => (
          <div key={index} className="deal-card">
            <img src={deal.image} alt={deal.name} />
            <h3>{deal.name}</h3>
            <p>{deal.description}</p>
          </div>
        ))}
      </Slider>

      {/* Popular Places Section */}
      <h2 className="section-title">Popular Places</h2>
      <div className="popular-places">
        {popularPlaces.map((place, index) => (
          <div
            key={index}
            className="place-card"
            onClick={() => handlePlaceClick(place.name)}
          >
            <img src={place.image} alt={place.name} />
            <h3>{place.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal for selected location */}
      {modalOpen && (
        <Modal onClose={handleCloseModal} location={selectedLocation} />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
