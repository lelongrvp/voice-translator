import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function ListGroups() {
  const [groups, setGroups] = useState({ groups: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/groups");
        setGroups(response.data);
      } catch (err) {
        setError("Failed to fetch groups");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "desc", label: "Description" },
    { key: "group_type", label: "Group Type" },
    { key: "license_id", label: "License ID" },
    { key: "app", label: "App" },
    { key: "created_at", label: "Created At" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Groups</h2>
        <Link
          to="/groups/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Group
        </Link>
      </div>
      <Table
        data={groups}
        columns={columns}
        basePath="/groups"
        dataKey="groups"
      />
    </div>
  );
}

export default ListGroups;
