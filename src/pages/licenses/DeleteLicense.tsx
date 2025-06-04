import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

interface License {
  id: number;
  license_type: string;
  server_id: number;
  stt_id: number;
  nmt_id: number;
  expiration_date: string;
  created_at: string;
}

function DeleteLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const response = await mockAPI.getById("licenses", id!);
        setLicense(response.data as License);
      } catch {
        setError("Failed to fetch license");
      } finally {
        setLoading(false);
      }
    };
    fetchLicense();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("licenses", id!);
      navigate("/licenses/list");
    } catch {
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
