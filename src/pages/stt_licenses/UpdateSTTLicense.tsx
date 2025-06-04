import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "../../components/Form";

function UpdateSTTLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sttLicense, setSTTLicense] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchSTTLicense = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/stt-licenses/${id}`,
          );
          setSTTLicense(response.data);
        } catch (err) {
          setError("Failed to fetch STT license");
        } finally {
          setLoading(false);
        }
      };
      fetchSTTLicense();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data) => {
    try {
      if (isNew) {
        await axios.post("http://localhost:3000/api/stt-licenses", data);
      } else {
        await axios.put(`http://localhost:3000/api/stt-licenses/${id}`, data);
      }
      navigate("/stt_licenses/list");
    } catch (err) {
      setError(
        isNew ? "Failed to create STT license" : "Failed to update STT license",
      );
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "key", label: "Key", required: true },
    { name: "limit_channel", label: "Limit Channel", type: "number" },
    { name: "product_id", label: "Product ID", type: "number", required: true },
    { name: "expiration_date", label: "Expiration Date", type: "date" },
    { name: "validation_date", label: "Validation Date", type: "date" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create STT License" : "Update STT License"}
      </h2>
      <Form
        fields={fields}
        initialData={sttLicense}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create STT License" : "Update STT License"}
      />
    </div>
  );
}

export default UpdateSTTLicense;
