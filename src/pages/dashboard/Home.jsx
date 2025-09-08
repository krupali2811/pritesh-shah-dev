import { Helmet } from "react-helmet-async";

import { CONFIG } from "../../utils/config-global";
import useAuth from "../../hooks/useAuth";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { useBoolean } from "../../hooks/use-boolean";

const metadata = { title: `Home | Dashboard - ${CONFIG.site.name}` };

export default function Home() {
  const { user } = useAuth();
  const copyReferralLink = useBoolean();

  const referralCode = user?.referral_code;
  const referralLink = `${window.location.origin}/auth/sign-up?ref=${referralCode}`;

  // if (loading) {
  //   return <LoadingScreen />;
  // }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div className="content px-20 pb-20">
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100 p-4">test</div>
          </div>
        </div>
      </div>
    </>
  );
}
