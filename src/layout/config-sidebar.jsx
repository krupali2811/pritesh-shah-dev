import useAuth from "../hooks/useAuth";
import { paths } from "../routes/paths";

// ----------------------------------------------------------------------

const RoleBasedNavData = () => {
  const { user } = useAuth();

  const navData = [
    { title: "Profile", path: paths.dashboard.root || "/" },
    { title: "Overview", path: paths.dashboard.root || "/" },
    { title: "Client List", path: paths.dashboard.clientList || "/" },
    { title: "KYC Management", path: paths.dashboard.kyc || "/" },
    { title: "Portfolios", path: paths.dashboard.portfolios || "/" },
    { title: "Analytics", path: paths.dashboard.analytics || "/" },
    { title: "Reports", path: paths.dashboard.reports || "/" },
    { title: "Messages", path: paths.dashboard.messages || "/" },
    { title: "Compliance", path: paths.dashboard.compliance || "/" },
  ];

  return navData;

  // const filteredNavData = navData.filter((item) => {
  //   const formattedRoleName = user?.role
  //     .replace(/_/g, " ") // Replace underscores with spaces
  //     .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

  //   return item.roles.includes(formattedRoleName);
  // });
  // return filteredNavData;
};

export default RoleBasedNavData;
