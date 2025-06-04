import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockAPI } from "../../services/mockApi";
import Modal from "../../components/Modal";

interface Group {
  id: number;
  name: string;
  desc?: string;
  group_type?: string;
  license_id: number;
  app: string;
  created_at?: string;
}

function DeleteGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await mockAPI.getById("groups", id!);
        setGroup(response.data as Group);
      } catch {
        setError("Failed to fetch group");
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await mockAPI.delete("groups", id!);
      navigate("/groups/list");
    } catch {
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
