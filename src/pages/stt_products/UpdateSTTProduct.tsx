import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "../../components/Form";

function UpdateSTTProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sttProduct, setSTTProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchSTTProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/stt-products/${id}`,
          );
          setSTTProduct(response.data);
        } catch (err) {
          setError("Failed to fetch STT product");
        } finally {
          setLoading(false);
        }
      };
      fetchSTTProduct();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data) => {
    try {
      if (isNew) {
        await axios.post("http://localhost:3000/api/stt-products", data);
      } else {
        await axios.put(`http://localhost:3000/api/stt-products/${id}`, data);
      }
      navigate("/stt_products/list");
    } catch (err) {
      setError(
        isNew ? "Failed to create STT product" : "Failed to update STT product",
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
        {isNew ? "Create STT Product" : "Update STT Product"}
      </h2>
      <Form
        fields={fields}
        initialData={sttProduct}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create STT Product" : "Update STT Product"}
      />
    </div>
  );
}

export default UpdateSTTProduct;
