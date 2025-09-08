import { Suspense } from "react";

import { SplashScreen } from "./loading-screen/splash-screen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
