import { Link } from "react-router-dom";

function Table({ data, columns, basePath }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border p-2 text-left">
                {col.label}
              </th>
            ))}
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key} className="border p-2">
                  {item[col.key] || "-"}
                </td>
              ))}
              <td className="border p-2 flex space-x-2">
                <Link
                  to={`${basePath}/update/${item.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                <Link
                  to={`${basePath}/delete/${item.id}`}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
