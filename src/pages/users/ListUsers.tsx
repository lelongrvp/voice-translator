import Table, { type TableItem } from "../../components/Table";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser.ts";
import type { User } from "../../types/User.ts";
import { userListEndpoint } from "../../const/endpoints/endpoints.ts";

function ListUsers() {
  const { userList, isLoading, error } = useUser({ page: 1, limit: 10 });

  const columns: Array<{ key: keyof User; label: string }> = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "appAccount", label: "App Account" },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link
          to="/users/update/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create User
        </Link>
      </div>
      <Table
        data={userList?.data as unknown as TableItem[]}
        columns={columns}
        basePath={userListEndpoint}
      />
    </div>
  );
}

export default ListUsers;
