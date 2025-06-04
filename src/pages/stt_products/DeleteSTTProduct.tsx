import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

function DeleteSTTProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sttProduct, setSTTProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchSTTProduct = async () => {
      try {
        const response = await mockAPI.getById(
          `http://localhost:3000/api/stt-products/${id}`,
        );
        setSTTProduct(response.data as any);
      } catch {
        setError("Failed to fetch STT product");
      } finally {
        setLoading(false);
      }
    };
    fetchSTTProduct();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("sttProducts", id!);
      navigate("/stt_products/list");
    } catch {
      setError("Failed to delete STT product");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/stt_products/list");
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete STT Product"
      message={`Are you sure you want to delete the STT product "${sttProduct?.name}"?`}
    />
  );
}

export default DeleteSTTProduct;
