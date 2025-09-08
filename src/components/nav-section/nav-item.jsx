import { Link } from "react-router-dom";

import { useActiveLink } from "../../routes/hooks/use-active-link";

import ChildNavItem from "./child-nav-item";

export default function NavItem({ data, toggleSidebar }) {
  const active = useActiveLink(data.path, !!data.children);
  const children = data?.children;
  return (
    <li className="nav-item mb-2">
      {data.children ? (
        <>
          <div
            className={active ? "nav-link active" : "nav-link"}
            onClick={window.innerWidth <= 1199 ? toggleSidebar : undefined}
          >
            <span className="me-10">{data.icon}</span>
            <span>
              <Link
                to={data.path}
                onClick={window.innerWidth <= 1199 ? toggleSidebar : undefined}
              >
                {data.title}
              </Link>
              <i
                className="bi bi-chevron-down small ms-2"
                data-bs-toggle="collapse"
                data-bs-target={`#menu_item_${data.path}`}
              ></i>
            </span>
          </div>
          <ul
            id={`menu_item_${data.path}`}
            className="submenu collapse list-unstyled"
            data-bs-parent="#nav_accordion"
          >
            {children.map((item, index) => (
              <ChildNavItem
                key={index}
                data={item}
                toggleSidebar={toggleSidebar}
              />
            ))}
          </ul>
        </>
      ) : (
        <Link
          to={data.path}
          className={active ? "nav-link active" : "nav-link"}
          onClick={window.innerWidth <= 1199 ? toggleSidebar : undefined}
        >
          <span className="me-10">{data.icon}</span>
          <span>{data.title}</span>
        </Link>
      )}
    </li>
  );
}
