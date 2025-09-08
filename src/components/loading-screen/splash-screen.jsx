import { motion as m } from "framer-motion";

export function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-container">
        {/* Logo Animation */}
        <m.div
          className="logo-wrapper"
          animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img className="logo" src="/assets/images/favicon.svg" alt="Animated Logo" />
        </m.div>

        {/* Outer Border Animation */}
        <m.div
          className="outer-border"
          animate={{
            scale: [1.6, 1, 1, 1.6, 1.6],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ["25%", "25%", "50%", "50%", "25%"],
          }}
          transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        />

        {/* Inner Border Animation */}
        <m.div
          className="inner-border"
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ["25%", "25%", "50%", "50%", "25%"],
          }}
          transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
