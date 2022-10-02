import { inventoryPaths } from "./inventory.path";
import { authPaths } from "./auth.path";
import { userPaths } from "./user.path";


const preparePaths = ({ prefix, paths }) => {
  let newPaths = {};

  for (const [k, path] of Object.entries(paths)) {
    if (typeof path === "function") {
      newPaths[k] = (id) => `${prefix}/${path(id)}`.replace(/\/+/g, "/");
    } else if (typeof path === "string") {
      if (path.length > 0) {
        newPaths[k] = `${prefix}/${path}`.replace(/\/+/g, "/");
      } else {
        newPaths[k] = `${prefix}`.replace(/\/+/g, "/");
      }
    } else {
      newPaths[k] = path;
    }
  }
  return newPaths;
};

const ApiPath = {
  ...preparePaths({ prefix: "auth", paths: authPaths }),
  ...preparePaths({ prefix: "inventory", paths: inventoryPaths }),
  ...preparePaths({ prefix: "users", paths: userPaths }),
};

export default ApiPath;
