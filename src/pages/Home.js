import React from "react";
import Navbar from "../components/Navbar";
import TextImageSection from "./home/TextImageSection ";
import LatestAnnouncements from "./home/LatestAnnouncements";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <TextImageSection />
      <LatestAnnouncements />
      <Footer />
    </div>
  );
};

export default Home;
