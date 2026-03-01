// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices, deleteService, logout } from "../utils/api";
import ServiceForm from "../components/admin/ServiceForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeTab, setActiveTab] = useState("services"); // 'services' | 'messages'
  const navigate = useNavigate();

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadMessages = async () => {
    try {
      setLoading(true);
      setMessagesError("");
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Tu sesión ha expirado. Vuelve a iniciar sesión.");
      }

      const response = await fetch(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Sesión no válida. Cierra sesión e inicia de nuevo.");
        }
        throw new Error("Error al cargar mensajes");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessagesError(
        error?.message || "No se pudieron cargar los mensajes de contacto.",
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al marcar mensaje como leído");
      }

      await loadMessages();
    } catch (error) {
      alert("Error al marcar el mensaje como leído");
    }
  };

  const deleteMessage = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este mensaje?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar mensaje");
      }

      await loadMessages();
    } catch (error) {
      alert("Error al eliminar el mensaje");
    }
  };
  // Cargar datos iniciales al montar el componente
  useEffect(() => {
    loadServices();
    loadMessages();
  }, []);

  // Recargar según la pestaña activa
  useEffect(() => {
    if (activeTab === "services") {
      loadServices();
    } else {
      loadMessages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este servicio?")
    ) {
      return;
    }

    try {
      await deleteService(id);
      await loadServices();
    } catch (error) {
      alert("Error al eliminar el servicio");
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null);
    loadServices();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Panel de Administración
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "services"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Servicios ({services.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "messages"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Mensajes ({messages.length})
            {messages.filter((m) => !m.read).length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {messages.filter((m) => !m.read).length}
              </span>
            )}
          </button>
        </div>

        {/* Services Tab */}
        {activeTab === "services" && (
          <>
            {/* Actions */}
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Servicios</h2>
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105"
              >
                + Nuevo Servicio
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title.es}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {service.title.es}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>CA:</strong> {service.title.ca}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>EN:</strong> {service.title.en}
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {service.description.es}
                    </p>
                    <p className="text-lg font-semibold text-red-600 mb-4">
                      {service.price.es}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No hay servicios. Crea uno nuevo para empezar.
                </p>
              </div>
            )}
          </>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Mensajes de Contacto
              </h2>
            </div>

            {messagesError && (
              <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
                <p className="text-red-700 font-medium mb-3">{messagesError}</p>
                <button
                  onClick={loadMessages}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Messages List */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-xl shadow-lg p-6 ${
                    !message.read ? "border-l-4 border-blue-600" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            NUEVO
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        📧 {message.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        📅{" "}
                        {new Date(message.date).toLocaleString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Asunto: {message.subject}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ✉️ Responder
                    </a>
                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        ✓ Marcar como leído
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {messages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No hay mensajes todavía.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Service Form Modal */}
      {showForm && (
        <ServiceForm service={editingService} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default AdminDashboard;
