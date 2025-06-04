import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await mockAPI.getById("users", id ?? 0);
        setUser(response.data as User);
      } catch {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("users", id!);
      navigate("/users/list");
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/users/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete User"
      message={`Are you sure you want to delete the user "${user?.name}"?`}
    />
  );
}

export default DeleteUser;
