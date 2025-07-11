import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Form from "../../components/Form";

function UpdateNMTLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nmtLicense, setNMTLicense] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchNMTLicense = async () => {
        try {
          const response = await mockAPI.getById(
            `http://localhost:3000/api/nmt-licenses/${id}`,
          );
          setNMTLicense(response.data as any);
        } catch {
          setError("Failed to fetch NMT license");
        } finally {
          setLoading(false);
        }
      };
      fetchNMTLicense();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isNew) {
        await mockAPI.create("nmtLicenses", data);
      } else {
        await mockAPI.update("nmtLicenses", id!, data);
      }
      navigate("/nmt_licenses/list");
    } catch {
      setError(
        isNew ? "Failed to create NMT license" : "Failed to update NMT license",
      );
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "key", label: "Key", required: true },
    { name: "product_id", label: "Product ID", type: "number", required: true },
    { name: "expiration_date", label: "Expiration Date", type: "date" },
    { name: "validation_date", label: "Validation Date", type: "date" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create NMT License" : "Update NMT License"}
      </h2>
      <Form
        fields={fields}
        initialData={nmtLicense}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create NMT License" : "Update NMT License"}
      />
    </div>
  );
}

export default UpdateNMTLicense;
