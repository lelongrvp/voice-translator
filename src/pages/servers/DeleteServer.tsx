import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

function DeleteServer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/servers/${id}`,
        );
        setServer(response.data);
      } catch (err) {
        setError("Failed to fetch server");
      } finally {
        setLoading(false);
      }
    };
    fetchServer();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/servers/${id}`);
      navigate("/servers/list");
    } catch (err) {
      setError("Failed to delete server");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/servers/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete Server"
      message={`Are you sure you want to delete the server "${server?.name}"?`}
    />
  );
}

export default DeleteServer;
