import useAuth from "../hooks/useAuth";
import { paths } from "../routes/paths";

// ----------------------------------------------------------------------

const RoleBasedNavData = () => {
  const { user } = useAuth();


  const navData = [
    {
      title: "Overview",
      path: paths.dashboard.root,
      roles: ["Admin", "Client"],
    },
    {
      title: "Client List",
      path: paths.dashboard.clientList,
      roles: ["Admin", "Client"],
    },
    {
      title: "KYC Management",
      path: paths.dashboard.kycManagement,
      roles: ["Admin", "Client"],
    },
    { title: "Portfolios", path: paths.dashboard.portfolios , roles: ["Admin", "Client"]},
    { title: "Analytics", path: paths.dashboard.analytics , roles: ["Admin", "Client"]},
    { title: "Reports", path: paths.dashboard.reports , roles: ["Admin", "Client"]},
    { title: "Messages", path: paths.dashboard.messages , roles: ["Admin", "Client"]},
    { title: "Compliance", path: paths.dashboard.compliance , roles: ["Admin", "Client"]},
    // {
    //   title: "User Management",
    //   path: paths.dashboard.userManagement.root,
    //   icon: (
    //     <svg
    //       width="23"
    //       height="23"
    //       viewBox="0 0 23 23"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M11.7134 13.6724C9.96298 13.6724 9.20145 15.0546 9.01367 15.7087C9.78715 16.2244 10.7154 16.5254 11.7127 16.5254C12.71 16.5254 13.6383 16.2244 14.4117 15.7087C14.2253 15.0591 13.4699 13.6724 11.7134 13.6724Z"
    //         fill="#E8EAED"
    //       />
    //       <path
    //         d="M11.7127 12.3829C12.5006 12.3829 13.1393 11.7442 13.1393 10.9563C13.1393 10.1685 12.5006 9.52979 11.7127 9.52979C10.9248 9.52979 10.2861 10.1685 10.2861 10.9563C10.2861 11.7442 10.9248 12.3829 11.7127 12.3829Z"
    //         fill="#E8EAED"
    //       />
    //       <path
    //         d="M22.0684 9.62168H20.425C20.203 8.66967 19.8221 7.75138 19.3042 6.91989L20.4675 5.7566C20.7191 5.50515 20.7192 5.09673 20.4675 4.84511L18.5148 2.89252C18.2631 2.64081 17.8551 2.64081 17.6033 2.89252L16.44 4.05577C15.6083 3.5377 14.6899 3.15673 13.7382 2.93489V1.2915C13.7382 0.935551 13.4496 0.646973 13.0936 0.646973H10.3321C9.97618 0.646973 9.6876 0.935551 9.6876 1.2915V2.93489C8.73584 3.15669 7.81756 3.53765 6.98577 4.05577L5.82243 2.89252C5.57077 2.64077 5.16265 2.64085 4.91094 2.89252L2.95827 4.84511C2.70673 5.09656 2.70655 5.50498 2.95827 5.7566L4.12156 6.91989C3.6037 7.75138 3.22274 8.66967 3.00076 9.62168H1.35742C1.00147 9.62168 0.712891 9.91026 0.712891 10.2662V13.0277C0.712891 13.3837 1.00147 13.6723 1.35742 13.6723H3.00076C3.22274 14.6243 3.6037 15.5426 4.12156 16.3741L2.95827 17.5373C2.70673 17.7888 2.70655 18.1972 2.95827 18.4488L4.91094 20.4014C5.16269 20.6531 5.57072 20.6531 5.82243 20.4014L6.98577 19.2382C7.81747 19.7562 8.73584 20.1372 9.6876 20.3591V22.0024C9.6876 22.3584 9.97618 22.647 10.3321 22.647H13.0936C13.4496 22.647 13.7382 22.3584 13.7382 22.0024V20.3591C14.6899 20.1373 15.6082 19.7563 16.44 19.2382L17.6033 20.4014C17.855 20.6532 18.2631 20.6531 18.5148 20.4014L20.4675 18.4488C20.7191 18.1974 20.7192 17.789 20.4675 17.5373L19.3042 16.3741C19.8221 15.5426 20.203 14.6243 20.425 13.6723H22.0684C22.4243 13.6723 22.7129 13.3837 22.7129 13.0277V10.2662C22.7129 9.91026 22.4243 9.62168 22.0684 9.62168ZM11.7129 17.8144C8.31213 17.8144 5.54546 15.0477 5.54546 11.647C5.54546 8.24625 8.31213 5.47954 11.7129 5.47954C15.1137 5.47954 17.8803 8.24621 17.8803 11.647C17.8803 15.0477 15.1137 17.8144 11.7129 17.8144Z"
    //         fill="#E8EAED"
    //       />
    //       <path
    //         d="M11.7128 6.76855C9.02287 6.76855 6.83447 8.957 6.83447 11.6469C6.83447 12.8424 7.267 13.9386 7.98341 14.7879C8.15954 14.4001 8.65162 13.4696 9.78226 12.8641C9.29727 12.3734 8.99722 11.6995 8.99722 10.9566C8.99722 9.45917 10.2155 8.24096 11.7128 8.24096C13.2102 8.24096 14.4285 9.45922 14.4285 10.9566C14.4285 11.6994 14.1284 12.3734 13.6434 12.8641C14.7733 13.4691 15.2656 14.3989 15.4423 14.7879C16.1587 13.9387 16.5912 12.8424 16.5912 11.6469C16.5912 8.95695 14.4028 6.76855 11.7128 6.76855Z"
    //         fill="#E8EAED"
    //       />
    //     </svg>
    //   ),
    //   children: [
    //     {
    //       title: "User KYC",
    //       path: paths.dashboard.userManagement.userKyc.root,
    //       children: [],
    //     },
    //     // {
    //     //   title: "Funding History",
    //     //   path: paths.dashboard.userManagement.fundingHistory,
    //     //   children: [],
    //     // },
    //     // {
    //     //   title: "Transactions",
    //     //   path: paths.dashboard.userManagement.transactions,
    //     //   children: [],
    //     // },
    //     // {
    //     //   title: "Wallet Transactions",
    //     //   path: paths.dashboard.userManagement.walletTransactions,
    //     //   children: [],
    //     // },
    //     // {
    //     //   title: "Wallet Tx Approval",
    //     //   path: paths.dashboard.userManagement.walletTxApproval,
    //     //   children: [],
    //     // },
    //   ],
    //   roles: ["Admin"],
    // },
  ];

  const filteredNavData = navData.filter((item) => {
    console.log(user.role)
    const formattedRoleName = user?.role?.role_name
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    return item.roles.includes(formattedRoleName);
  });
  return filteredNavData;
  // return navData;
};

export default RoleBasedNavData;
