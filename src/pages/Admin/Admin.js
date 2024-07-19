import React, { useState, useEffect } from "react";
import {
  getUsers,
  getAnnouncements,
  getMessages,
  getRoles,
  getCategories,
  getUser,
  updateUser,
  getAnnouncement,
  updateAnnouncement,
  deleteUser,
  deleteAnnouncement,
  updateMessage,
  updateRole,
  updateCategory,
  deleteMessage,
  deleteRole,
  deleteCategory,
} from "./Service";
import "../../styles/styles.css";
import Navbar from "../../components/Navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
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

        setUsers(usersRes.data);
        setLoadingUsers(false);

        setAnnouncements(announcementsRes.data);
        setLoadingAnnouncements(false);

        setMessages(messagesRes.data);
        setLoadingMessages(false);

        setRoles(rolesRes.data);
        setLoadingRoles(false);

        setCategories(categoriesRes.data);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoadingUsers(false);
        setLoadingAnnouncements(false);
        setLoadingMessages(false);
        setLoadingRoles(false);
        setLoadingCategories(false);
      }
    };

    getAllData();
  }, []);

  const handleSelect = async (entity, id = null) => {
    if (selectedEntity !== entity) {
      setSelectedData(null);
      setIsEditing(false);
    }

    setSelectedEntity(entity);

    if (id) {
      try {
        let data;
        if (entity === "users") data = await getUser(id);
        else if (entity === "announcements") data = await getAnnouncement(id);
        else if (entity === "messages") data = await getMessages(id);
        else if (entity === "roles") data = await getRoles(id);
        else if (entity === "categories") data = await getCategories(id);

        setSelectedData(data.data);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des données de ${entity}:`,
          error
        );
      }
    } else {
      setSelectedData(null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (selectedEntity === "users")
        await updateUser(selectedData.id, selectedData);
      else if (selectedEntity === "announcements")
        await updateAnnouncement(selectedData.id, selectedData);
      else if (selectedEntity === "messages")
        await updateMessage(selectedData.id, selectedData);
      else if (selectedEntity === "roles")
        await updateRole(selectedData.id, selectedData);
      else if (selectedEntity === "categories")
        await updateCategory(selectedData.id, selectedData);
      setIsEditing(false);
    } catch (error) {
      console.error(
        `Erreur lors de la modification des données de ${selectedEntity}:`,
        error
      );
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedEntity === "users") {
        await deleteUser(selectedData.id);
        setUsers(users.filter((user) => user.id !== selectedData.id));
      } else if (selectedEntity === "announcements") {
        await deleteAnnouncement(selectedData.id);
        setAnnouncements(
          announcements.filter(
            (announcement) => announcement.id !== selectedData.id
          )
        );
      } else if (selectedEntity === "messages") {
        await deleteMessage(selectedData.id);
        setMessages(
          messages.filter((message) => message.id !== selectedData.id)
        );
      } else if (selectedEntity === "roles") {
        await deleteRole(selectedData.id);
        setRoles(roles.filter((role) => role.id !== selectedData.id));
      } else if (selectedEntity === "categories") {
        await deleteCategory(selectedData.id);
        setCategories(
          categories.filter((category) => category.id !== selectedData.id)
        );
      }

      setSelectedEntity(null);
      setSelectedData(null);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression des données de ${selectedEntity}:`,
        error
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="admin-page">
      <Navbar />;<h1>Panneau d'administration</h1>
      <div className="pills-container">
        <button
          className={`pill ${selectedEntity === "users" ? "active" : ""}`}
          onClick={() => handleSelect("users")}
        >
          Utilisateurs
        </button>
        <button
          className={`pill ${
            selectedEntity === "announcements" ? "active" : ""
          }`}
          onClick={() => handleSelect("announcements")}
        >
          Annonces
        </button>
        <button
          className={`pill ${selectedEntity === "messages" ? "active" : ""}`}
          onClick={() => handleSelect("messages")}
        >
          Messages
        </button>
        <button
          className={`pill ${selectedEntity === "roles" ? "active" : ""}`}
          onClick={() => handleSelect("roles")}
        >
          Rôles
        </button>
        <button
          className={`pill ${selectedEntity === "categories" ? "active" : ""}`}
          onClick={() => handleSelect("categories")}
        >
          Catégories
        </button>
      </div>
      <div className="section">
        {selectedEntity === "users" && (
          <>
            <h2>Utilisateurs</h2>
            {loadingUsers ? (
              <p>Chargement...</p>
            ) : users.length > 0 ? (
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    {user.name}
                    <button onClick={() => handleSelect("users", user.id)}>
                      Voir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Pas d'utilisateurs</p>
            )}
          </>
        )}

        {selectedEntity === "announcements" && (
          <>
            <h2>Annonces</h2>
            {loadingAnnouncements ? (
              <p>Chargement...</p>
            ) : announcements.length > 0 ? (
              <ul>
                {announcements.map((announcement) => (
                  <li key={announcement.id}>
                    {announcement.title}
                    <button
                      onClick={() =>
                        handleSelect("announcements", announcement.id)
                      }
                    >
                      Voir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Pas d'annonces</p>
            )}
          </>
        )}

        {selectedEntity === "messages" && (
          <>
            <h2>Messages</h2>
            {loadingMessages ? (
              <p>Chargement...</p>
            ) : messages.length > 0 ? (
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    {message.texte}
                    <button
                      onClick={() => handleSelect("messages", message.id)}
                    >
                      Voir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Pas de messages</p>
            )}
          </>
        )}

        {selectedEntity === "roles" && (
          <>
            <h2>Rôles</h2>
            {loadingRoles ? (
              <p>Chargement...</p>
            ) : roles.length > 0 ? (
              <ul>
                {roles.map((role) => (
                  <li key={role.id}>
                    {role.role}
                    <button onClick={() => handleSelect("roles", role.id)}>
                      Voir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Pas de rôles</p>
            )}
          </>
        )}

        {selectedEntity === "categories" && (
          <>
            <h2>Catégories</h2>
            {loadingCategories ? (
              <p>Chargement...</p>
            ) : categories.length > 0 ? (
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    {category.name_category}
                    <button
                      onClick={() => handleSelect("categories", category.id)}
                    >
                      Voir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Pas de catégories</p>
            )}
          </>
        )}
      </div>
      {selectedData && (
        <div className="edit-section">
          <h2>Modifier {selectedEntity.slice(0, -1)}</h2>
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {Object.keys(selectedData).map((key) => (
                <div key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={selectedData[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button type="submit">Enregistrer</button>
            </form>
          ) : (
            <div>
              {Object.keys(selectedData).map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {selectedData[key]}
                </p>
              ))}
              <button onClick={handleEdit}>Modifier</button>
              <button onClick={handleDelete}>Supprimer</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
