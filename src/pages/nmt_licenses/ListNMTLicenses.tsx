import { useEffect, useState } from "react";
import { mockAPI } from "../../services/mockApi";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function ListNMTLicenses() {
  const [nmtLicenses, setNMTLicenses] = useState({ licenses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNMTLicenses = async () => {
      try {
        const response = await mockAPI.getAll(
          "http://localhost:3000/api/nmt-licenses",
        );
        setNMTLicenses(response.data);
      } catch {
        setError("Failed to fetch NMT licenses");
      } finally {
        setLoading(false);
      }
    };
    fetchNMTLicenses();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "key", label: "Key" },
    { key: "product_id", label: "Product ID" },
    { key: "expiration_date", label: "Expiration Date" },
    { key: "validation_date", label: "Validation Date" },
    { key: "created_at", label: "Created At" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">NMT Licenses</h2>
        <Link
          to="/nmt_licenses/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create NMT License
        </Link>
      </div>
      <Table
        data={nmtLicenses}
        columns={columns}
        basePath="/nmt_licenses"
      />
    </div>
  );
}

export default ListNMTLicenses;
