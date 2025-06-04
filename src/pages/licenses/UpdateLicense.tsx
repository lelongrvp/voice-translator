import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Form from "../../components/Form";

function UpdateLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchLicense = async () => {
        try {
          const response = await mockAPI.getById(
            `http://localhost:3000/api/licenses/${id}`,
          );
          setLicense(response.data);
        } catch {
          setError("Failed to fetch license");
        } finally {
          setLoading(false);
        }
      };
      fetchLicense();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isNew) {
        await mockAPI.create("licenses", data);
      } else {
        await mockAPI.update("licenses", id!, data);
      }
      navigate("/licenses/list");
    } catch {
      setError(isNew ? "Failed to create license" : "Failed to update license");
    }
  };

  const fields = [
    { name: "license_type", label: "License Type", required: true },
    { name: "server_id", label: "Server ID", type: "number", required: true },
    { name: "stt_id", label: "STT License ID", type: "number" },
    { name: "nmt_id", label: "NMT License ID", type: "number" },
    { name: "expiration_date", label: "Expiration Date", type: "date" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create License" : "Update License"}
      </h2>
      <Form
        fields={fields}
        initialData={license}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create License" : "Update License"}
      />
    </div>
  );
}

export default UpdateLicense;
