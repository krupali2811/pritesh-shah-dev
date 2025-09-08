import packageJson from "../../package.json";
import { paths } from "../routes/paths";

// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: "Pritesh Shah",
    serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
    socketUrl: import.meta.env.VITE_SOCKET_URL ?? "",
    assetURL: import.meta.env.VITE_ASSET_URL ?? "",
    basePath: import.meta.env.VITE_BASE_PATH ?? "",
    version: packageJson.version,
  },
  /**
   * Auth
   * @method jwt
   */
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.dashboard.root,
  }
};
