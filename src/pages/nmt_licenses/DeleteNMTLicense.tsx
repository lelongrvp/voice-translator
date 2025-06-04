import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

function DeleteNMTLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nmtLicense, setNMTLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchNMTLicense = async () => {
      try {
        const response = await mockAPI.getById(
          `http://localhost:3000/api/nmt-licenses/${id}`,
        );
        setNMTLicense(response.data as any);
      } catch {
        setError("Failed to fetch NMT license");
      } finally {
        setLoading(false);
      }
    };
    fetchNMTLicense();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("nmtLicenses", id!);
      navigate("/nmt_licenses/list");
    } catch {
      setError("Failed to delete NMT license");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/nmt_licenses/list");
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete NMT License"
      message={`Are you sure you want to delete the NMT license "${nmtLicense?.name}"?`}
    />
  );
}

export default DeleteNMTLicense;
