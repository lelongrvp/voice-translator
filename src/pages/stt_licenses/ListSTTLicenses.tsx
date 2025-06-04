import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function ListSTTLicenses() {
  const [sttLicenses, setSTTLicenses] = useState({ licenses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSTTLicenses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/stt-licenses",
        );
        setSTTLicenses(response.data);
      } catch (err) {
        setError("Failed to fetch STT licenses");
      } finally {
        setLoading(false);
      }
    };
    fetchSTTLicenses();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "key", label: "Key" },
    { key: "limit_channel", label: "Limit Channel" },
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
        <h2 className="text-2xl font-bold">STT Licenses</h2>
        <Link
          to="/stt_licenses/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create STT License
        </Link>
      </div>
      <Table
        data={sttLicenses}
        columns={columns}
        basePath="/stt_licenses"
        dataKey="licenses"
      />
    </div>
  );
}

export default ListSTTLicenses;
