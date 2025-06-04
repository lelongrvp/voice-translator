import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "../../components/Form";

function UpdateNMTProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nmtProduct, setNMTProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchNMTProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/nmt-products/${id}`,
          );
          setNMTProduct(response.data);
        } catch (err) {
          setError("Failed to fetch NMT product");
        } finally {
          setLoading(false);
        }
      };
      fetchNMTProduct();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data) => {
    try {
      if (isNew) {
        await axios.post("http://localhost:3000/api/nmt-products", data);
      } else {
        await axios.put(`http://localhost:3000/api/nmt-products/${id}`, data);
      }
      navigate("/nmt_products/list");
    } catch (err) {
      setError(
        isNew ? "Failed to create NMT product" : "Failed to update NMT product",
      );
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "desc", label: "Description" },
    { name: "company", label: "Company" },
    { name: "protocol", label: "Protocol", required: true },
    { name: "endpoint", label: "Endpoint", required: true },
  ];

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isNew ? "Create NMT Product" : "Update NMT Product"}
      </h2>
      <Form
        fields={fields}
        initialData={nmtProduct}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create NMT Product" : "Update NMT Product"}
      />
    </div>
  );
}

export default UpdateNMTProduct;
