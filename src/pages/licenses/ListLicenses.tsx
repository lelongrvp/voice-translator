import { useEffect, useState } from "react";
import { mockAPI } from "../../services/mockApi";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

interface License {
  id: number;
  license_type: string;
  server_id: number;
  stt_id: number;
  nmt_id: number;
  expiration_date: string;
  created_at: string;
  [key: string]: unknown;
}

function ListLicenses() {
  const [licenses, setLicenses] = useState<{ licenses: License[] }>({
    licenses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await mockAPI.getAll("licenses");
        setLicenses(response.data as { licenses: License[] });
      } catch {
        setError("Failed to fetch licenses");
      } finally {
        setLoading(false);
      }
    };
    fetchLicenses();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "license_type", label: "License Type" },
    { key: "server_id", label: "Server ID" },
    { key: "stt_id", label: "STT License ID" },
    { key: "nmt_id", label: "NMT License ID" },
    { key: "expiration_date", label: "Expiration Date" },
    { key: "created_at", label: "Created At" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Licenses</h2>
        <Link
          to="/licenses/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create License
        </Link>
      </div>
      <Table data={licenses.licenses} columns={columns} basePath="/licenses" />
    </div>
  );
}

export default ListLicenses;
