import React, { useMemo} from "react";
import { Routes, Route } from "react-router-dom";
import { Menu } from "modules";
import { Path } from "paths";
import { InventorySummary, EmployeeList, JobRoles, Parts, Brands, Units, Supplier, Warehouse, Inbound, Outbound, Administration, Reports } from "modules";

const AuthorizedPage = () => {
  
  const renders = useMemo(() => {
    return {
      [Path.MENU]: {
        exact: true,
        element: <Menu />,
      },
      [Path.EMPLOYEES]: {
        exact: true,
        element: <EmployeeList />,
      },
      [Path.JOB_ROLES]: {
        exact: true,
        element: <JobRoles />,
      },
      [Path.PARTS]: {
        exact: true,
        element: <Parts />,
      },
      [Path.BRANDS]: {
        exact: true,
        element: <Brands />,
      },
      [Path.UNITS]: {
        exact: true,
        element: <Units />,
      },
      [Path.SUPPLIER]: {
        exact: true,
        element: <Supplier />,
      },
      [Path.WAREHOUSE]: {
        exact: true,
        element: <Warehouse />,
      },
      [Path.INVENTORY]: {
        exact: true,
        element: <InventorySummary />,
      },
      [Path.INBOUND]: {
        exact: true,
        element: <Inbound />,
      },
      [Path.OUTBOUND]: {
        exact: true,
        element: <Outbound />,
      },
      [Path.ADMINISTRATION]: {
        exact: true,
        element: <Administration />,
      },
      [Path.REPORT]: {
        exact: true,
        element: <Reports />,
      },
    };
  }, []);

  const routeNames = useMemo(() => {
    return Object.keys(renders);
  }, [renders]);

  const routes = useMemo(() => {
    return routeNames.map((r, key) => {
      return <Route {...renders[r]} path={r} key={key} />;
    });
  }, [routeNames, renders]);

  return (
      <Routes>
        {routes}
      </Routes>
    )
};

export default AuthorizedPage;
