import useAuth from "../hooks/useAuth";
import { paths } from "../routes/paths";

// ----------------------------------------------------------------------

const RoleBasedNavData = () => {
  const { user } = useAuth();

  const navData = [
    { title: "Dashboard", path: paths.dashboard.root || "/" },
    { title: "KYC Management", path: paths.dashboard.kycManagement || "/" },
    { title: "Portfolio Summary", path: paths.dashboard.overview || "/" },
    { title: "Investments", path: paths.dashboard.investments || "/" },
    {
      title: "Performance Analytics",
      path: paths.dashboard.performance_analytics || "/",
    },
    { title: "Financial Goals", path: paths.dashboard.financial_goals || "/" },
    { title: "Notifications", path: paths.dashboard.notifications || "/" },
    { title: "Adviser Contact", path: paths.dashboard.advisor_contact || "/" },
    // { title: "Messages", path: paths.dashboard.messages || "/" },
    // { title: "Compliance", path: paths.dashboard.compliance || "/" },
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
