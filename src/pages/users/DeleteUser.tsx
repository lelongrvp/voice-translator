import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${id}`,
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      navigate("/users/list");
    } catch (err) {
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
