import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

function DeleteLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/licenses/${id}`,
        );
        setLicense(response.data);
      } catch (err) {
        setError("Failed to fetch license");
      } finally {
        setLoading(false);
      }
    };
    fetchLicense();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/licenses/${id}`);
      navigate("/licenses/list");
    } catch (err) {
      setError("Failed to delete license");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/licenses/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete License"
      message={`Are you sure you want to delete the license "${license?.license_type}"?`}
    />
  );
}

export default DeleteLicense;
