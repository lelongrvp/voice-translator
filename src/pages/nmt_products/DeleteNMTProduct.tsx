import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

function DeleteNMTProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nmtProduct, setNMTProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchNMTProduct = async () => {
      try {
        const response = await mockAPI.getById(
          `http://localhost:3000/api/nmt-products/${id}`,
        );
        setNMTProduct(response.data as any);
      } catch {
        setError("Failed to fetch NMT product");
      } finally {
        setLoading(false);
      }
    };
    fetchNMTProduct();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("nmtProducts", id!);
      navigate("/nmt_products/list");
    } catch {
      setError("Failed to delete NMT product");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/nmt_products/list");
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Delete NMT Product"
      message={`Are you sure you want to delete the NMT product "${nmtProduct?.name}"?`}
    />
  );
}

export default DeleteNMTProduct;
