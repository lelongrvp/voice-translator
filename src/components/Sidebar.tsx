import { Link } from "react-router-dom";
import { features } from "../const/sideBarItems.ts";

function Sidebar() {
  return (
    <div className="w-64 bg-background-1 text-neutral-2 h-screen p-4">
      <ul>
        {features.map((feature) => (
          <li key={feature.path} className="mb-2">
            <Link
              to={feature.path}
              className="flex p-2 hover:bg-white hover:text-black rounded font-semibold"
            >
              {feature.icon && (
                <span className="mr-2 w-5 h-5 text-current">
                  <feature.icon />
                </span>
              )}
              {feature.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
