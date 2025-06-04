import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Form from "../../components/Form";

function UpdateGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchGroup = async () => {
        try {
          const response = await mockAPI.getById("groups", id!);
          setGroup(response.data as any);
        } catch {
          setError("Failed to fetch group");
        } finally {
          setLoading(false);
        }
      };
      fetchGroup();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isNew) {
        await mockAPI.create("groups", data);
      } else {
        await mockAPI.update("groups", id!, data);
      }
      navigate("/groups/list");
    } catch {
      setError(isNew ? "Failed to create group" : "Failed to update group");
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "desc", label: "Description" },
    { name: "group_type", label: "Group Type" },
    { name: "license_id", label: "License ID", type: "number", required: true },
    { name: "app", label: "App", required: true },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create Group" : "Update Group"}
      </h2>
      <Form
        fields={fields}
        initialData={group}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create Group" : "Update Group"}
      />
    </div>
  );
}

export default UpdateGroup;
