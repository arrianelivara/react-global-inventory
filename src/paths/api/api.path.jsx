import { inventoryPaths } from "./inventory.path";
import { authPaths } from "./auth.path";
import { userPaths } from "./user.path";
import { brandPaths } from "./brand.path";
import { employeePaths } from "./employee.path";
import { partPaths } from "./part.path";
import { unitPaths } from "./unit.path";
import { warehousePaths } from "./warehouse.path";
import { jobRolePaths } from "./job-role.path";
import { supplierPaths } from "./supplier.path";


const preparePaths = ({ prefix, paths }) => {
  let newPaths = {};

  for (const [k, path] of Object.entries(paths)) {
    if (typeof path === "function") {
      newPaths[k] = (id) => `${prefix}/${path(id)}`.replace(/\/+/g, "/");
    } else if (typeof path === "string") {
      if (path.length > 0) {
        newPaths[k] = `${prefix}/${path}`.replace(/\/+/g, "/") + "/";
      } else {
        newPaths[k] = `${prefix}`.replace(/\/+/g, "/") + "/";
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
  ...preparePaths({ prefix: "user", paths: userPaths }),
  ...preparePaths({ prefix: "brand", paths: brandPaths }),
  ...preparePaths({ prefix: "employee", paths: employeePaths }),
  ...preparePaths({ prefix: "job_role", paths: jobRolePaths }),
  ...preparePaths({ prefix: "part", paths: partPaths }),
  ...preparePaths({ prefix: "unit", paths: unitPaths }),
  ...preparePaths({ prefix: "warehouse", paths: warehousePaths }),
  ...preparePaths({ prefix: "supplier", paths: supplierPaths }),
};

export default ApiPath;
