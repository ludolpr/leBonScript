import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/announcement"
        );
        setAnnouncements(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Erreur announcementssss:", error);
        setLoading(false);
      }
    };

    GetAnnouncements();
  }, []);

  return (
    <div>
      <h3>Dernières annonces</h3>
      {loading ? (
        <p>Loading...</p>
      ) : announcements.length > 0 ? (
        <ul>
          {announcements.map((announcement) => (
            <li className="annonces" key={announcement.title}>
              {announcement.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default LatestAnnouncements;
