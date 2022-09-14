import { administrationPaths } from "./administration.path";
import { authPaths } from "./auth.path";
import { inventoryPaths } from "./inventory.path";
import { masterDataPaths } from "./master-data.path";
import { reportPaths } from "./report";

const preparePaths = ({ prefix, paths = {} }) => {
  let newPaths = {};

  for (const [k, path] of Object.entries(paths)) {
    if (typeof path === "function") {
      newPaths[k] = (id) => `/${prefix}/${path(id)}`.replace(/\/+/g, "/");
    } else if (path) {
      newPaths[k] = `/${prefix}/${path}`.replace(/\/+/g, "/");
    } else {
      newPaths[k] = `/${prefix}`.replace(/\/+/g, "/");
    }
  }

  newPaths[prefix.toString().toUpperCase()] = `/${prefix}`;
  return newPaths;
};

const Path = {
  ...preparePaths({ prefix: "auth", paths: authPaths }),
  ...preparePaths({ prefix: "inventory", paths: inventoryPaths }),
  ...preparePaths({ prefix: "data", paths: masterDataPaths }),
  ...preparePaths({ prefix: "administration", paths: administrationPaths }),
  ...preparePaths({ prefix: "report", paths: reportPaths }),
  SLASH: "/",
  MENU: "/menu"
};

export default Path;
