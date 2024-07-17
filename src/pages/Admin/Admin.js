import React, { useState, useEffect } from "react";
import {
  getUsers,
  getAnnouncements,
  getMessages,
  getRoles,
  getCategories,
} from "./Service";
import "../../styles/styles.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);

  //   chargement ci-dessous
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const GetAllData = async () => {
      try {
        const [
          usersRes,
          announcementsRes,
          messagesRes,
          rolesRes,
          categoriesRes,
        ] = await Promise.all([
          getUsers(),
          getAnnouncements(),
          getMessages(),
          getRoles(),
          getCategories(),
        ]);

        if (usersRes) {
          setUsers(usersRes.data);
          setLoadingUsers(false);
        }

        if (announcementsRes) {
          setAnnouncements(announcementsRes.data);
          setLoadingAnnouncements(false);
        }

        if (messagesRes) {
          setMessages(messagesRes.data);
          setLoadingMessages(false);
        }

        if (rolesRes) {
          setRoles(rolesRes.data);
          setLoadingRoles(false);
        }

        if (categoriesRes) {
          setCategories(categoriesRes.data);
          setLoadingCategories(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingUsers(false);
        setLoadingAnnouncements(false);
        setLoadingMessages(false);
        setLoadingRoles(false);
        setLoadingCategories(false);
      }
    };

    GetAllData();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="section">
        <h2>Users</h2>
        {loadingUsers ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users available.</p>
        )}
      </div>

      <div className="section">
        <h2>Announcements</h2>
        {loadingAnnouncements ? (
          <p>Loading...</p>
        ) : announcements.length > 0 ? (
          <ul>
            {announcements.map((announcement) => (
              <li className="annonces" key={announcement.id}>
                {announcement.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      <div className="section">
        <h2>Messages</h2>
        {loadingMessages ? (
          <p>Loading...</p>
        ) : messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>{message.content}</li>
            ))}
          </ul>
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      <div className="section">
        <h2>Roles</h2>
        {loadingRoles ? (
          <p>Loading...</p>
        ) : roles.length > 0 ? (
          <ul>
            {roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        ) : (
          <p>No roles available.</p>
        )}
      </div>

      <div className="section">
        <h2>Categories</h2>
        {loadingCategories ? (
          <p>Loading...</p>
        ) : categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
