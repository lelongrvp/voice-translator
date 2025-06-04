import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

function DeleteGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
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
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/groups/${id}`);
      navigate("/groups/list");
    } catch (err) {
      setError("Failed to delete group");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/groups/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete Group"
      message={`Are you sure you want to delete the group "${group?.name}"?`}
    />
  );
}

export default DeleteGroup;
