import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

function DeleteSTTLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sttLicense, setSTTLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchSTTLicense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/stt-licenses/${id}`,
        );
        setSTTLicense(response.data);
      } catch (err) {
        setError("Failed to fetch STT license");
      } finally {
        setLoading(false);
      }
    };
    fetchSTTLicense();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/stt-licenses/${id}`);
      navigate("/stt_licenses/list");
    } catch (err) {
      setError("Failed to delete STT license");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/stt_licenses/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete STT License"
      message={`Are you sure you want to delete the STT license "${sttLicense?.name}"?`}
    />
  );
}

export default DeleteSTTLicense;
