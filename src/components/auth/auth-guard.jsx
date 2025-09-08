import { useState, useCallback, useEffect } from "react";

import useAuth from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import { useRouter } from "../../routes/hooks/use-router";
import { usePathname } from "../../routes/hooks/use-pathname";
import { useSearchParams } from "../../routes/hooks/use-search-params";
import { SplashScreen } from "../loading-screen/splash-screen";

export default function AuthGuard({ children }) {
  const { user, isAuthenticated, isInitialized } = useAuth();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [isChecking, setIsChecking] = useState(true);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async () => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      const href = `${paths.auth.jwt.signIn}?${createQueryString(
        "returnTo",
        pathname
      )}`;

      router.replace(href);
      return;
    }

      setIsChecking(false);
    // setTimeout(() => {
    //   setIsChecking(false);
    // }, 8000);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInitialized]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
