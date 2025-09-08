import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { CONFIG } from "../../../utils/config-global";
import { useGetUser } from "../../../actions/admin";
import { LoadingScreen } from "../../../components/loading-screen/loading-screen";
import { CustomBreadcrumbs } from "../../../components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "../../../routes/paths";

import UserKycNewEditForm from "./userkyc-new-edit-form";

const metadata = { title: `Edit User | Dashboard - ${CONFIG.site.name}` };

export default function EditUsers() {
  const { id } = useParams();
  const { user, refetch, userLoading, userError, userValidating } = useGetUser(id);

  useEffect(() => {
    refetch();
  }, [id])
  
  if (userLoading || userValidating) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <div className="content px-20 pb-20">
        <CustomBreadcrumbs
          heading="Edit User"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "User", href: paths.dashboard.userManagement.userKyc.root },
            { name: user?.firstname || "Edit User" },
          ]}
          sx={{ mt: 1, mb: { xs: 3, md: 5 } }}
        />
        <UserKycNewEditForm user={user} userId={id} />
      </div>
    </>
  );
}
