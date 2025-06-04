import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Form from "../../components/Form";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (!isNew) {
      const fetchUser = async () => {
        try {
          const response = await mockAPI.getById("users", id ?? 0);
          setUser(response.data as any);
        } catch {
          setError("Failed to fetch user");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isNew) {
        await mockAPI.create(
          "users",
          data as unknown as Record<string, unknown>
        );
      } else {
        await mockAPI.update(
          "users",
          id!,
          data as unknown as Record<string, unknown>
        );
      }
      navigate("/users/list");
    } catch {
      setError(isNew ? "Failed to create user" : "Failed to update user");
    }
  };

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "app_account", label: "App Account", required: true },
    { name: "password", label: "Password", type: "password", required: isNew },
    { name: "role_id", label: "Role ID", type: "number", required: true },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "Create User" : "Update User"}
      </h2>
      <Form
        fields={fields}
        initialData={user}
        onSubmit={handleSubmit}
        submitLabel={isNew ? "Create User" : "Update User"}
      />
    </div>
  );
}

export default UpdateUser;
