import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function ListNMTProducts() {
  const [nmtProducts, setNMTProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNMTProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/nmt-products",
        );
        setNMTProducts(response.data);
      } catch (err) {
        setError("Failed to fetch NMT products");
      } finally {
        setLoading(false);
      }
    };
    fetchNMTProducts();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "desc", label: "Description" },
    { key: "company", label: "Company" },
    { key: "protocol", label: "Protocol" },
    { key: "endpoint", label: "Endpoint" },
    { key: "created_at", label: "Created At" },
  ];

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">NMT Products</h2>
        <Link
          to="/nmt_products/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Create NMT Product
        </Link>
      </div>
      <Table
        data={nmtProducts}
        columns={columns}
        basePath="/nmt_products"
        dataKey="products"
      />
    </div>
  );
}

export default ListNMTProducts;
