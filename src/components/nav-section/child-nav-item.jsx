import { Link } from "react-router-dom";

import { useActiveLink } from "../../routes/hooks/use-active-link";

export default function ChildNavItem({ data, toggleSidebar }) {
  const active = useActiveLink(data.path, !!data.children);

  return (
    <li className="nav-item mb-2">
    <Link
      to={data.path}
      className={active ? "nav-link active" : "nav-link"}
      onClick={window.innerWidth <= 1199 ? toggleSidebar : undefined}
    >
      <span className="me-15">{data.icon}</span>
      <span>{data.title}</span>
    </Link>
  </li>
  );
}
