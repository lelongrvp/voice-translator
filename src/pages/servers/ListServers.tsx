import { useEffect, useState } from "react";
import { mockAPI } from "../../services/mockApi";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function ListServers() {
  const [servers, setServers] = useState({ servers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await mockAPI.getAll("servers");
        setServers(response.data as any);
      } catch {
        setError("Failed to fetch servers");
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "key", label: "Key" },
    { key: "frontend_endpoint", label: "Frontend Endpoint" },
    { key: "server_endpoint", label: "Server Endpoint" },
    { key: "created_at", label: "Created At" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Servers</h2>
        <Link
          to="/servers/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Server
        </Link>
      </div>
      <Table
        data={servers.servers}
        columns={columns}
        basePath="/servers"
      />
    </div>
  );
}

export default ListServers;
