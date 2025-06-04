import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Form from "../../components/Form";

function UpdateServer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [server, setServer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchServer = async () => {
        try {
          const response = await mockAPI.getById(
            `http://localhost:3000/api/servers/${id}`,
          );
          setServer(response.data as any);
        } catch {
          setError("Failed to fetch server");
        } finally {
          setLoading(false);
        }
      };
      fetchServer();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isNew) {
        await mockAPI.create("servers", data);
      } else {
        await mockAPI.update("servers", id!, data);
      }
      navigate("/servers/list");
    } catch {
      setError(isNew ? "Failed to create server" : "Failed to update server");
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "key", label: "Key", required: true },
    { name: "frontend_endpoint", label: "Frontend Endpoint" },
    { name: "server_endpoint", label: "Server Endpoint" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create Server" : "Update Server"}
      </h2>
      <Form
        fields={fields}
        initialData={server}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create Server" : "Update Server"}
      />
    </div>
  );
}

export default UpdateServer;
