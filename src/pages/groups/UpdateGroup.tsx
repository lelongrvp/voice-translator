import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
          const response = await axios.get(
            `http://localhost:3000/api/groups/${id}`,
          );
          setGroup(response.data);
        } catch (err) {
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

  const handleSubmit = async (data) => {
    try {
      if (isNew) {
        await axios.post("http://localhost:3000/api/groups", data);
      } else {
        await axios.put(`http://localhost:3000/api/groups/${id}`, data);
      }
      navigate("/groups/list");
    } catch (err) {
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
