import { Path } from "paths";
import lang from "translations";

export const main_menus = [
      {
        name: "MENU",
        key: "menu",
        description: "Main Menu",
        children: [],
        path: Path.MENU,
      },
      {
        name: "MASTER DATA",
        key: "master_data",
        description: "Master Data",
        children: [
          {
            name: "Employees",
            key: "employees",
            description: "Employees",
            path: Path.EMPLOYEES,
          },
          {
            name: "Job Roles",
            key: "job_roles",
            description: "Job Roles",
            path: Path.JOB_ROLES,
          },
          {
            name: "Parts",
            key: "parts",
            description: "Parts",
            path: Path.PARTS,
          },
          {
            name: "Brands",
            key: "brands",
            description: "Brands",
            path: Path.BRANDS,
          },
          {
            name: "Units",
            key: "units",
            description: "Units",
            path: Path.UNITS,
          },
          {
            name: "Supplier",
            key: "supplier",
            description: "Supplier",
            path: Path.SUPPLIER,
          },
          {
            name: "Warehouse",
            key: "warehouse",
            description: "Warehouse",
            path: Path.WAREHOUSE,
          }
        ]
      },
      {
        name: "INVENTORY",
        key: "inventory",
        description: "Inventory",
        path: Path.INVENTORY,
        children: [
          {
            name: "Inbound",
            key: "inbound",
            description: "Inbound",
            path: Path.INBOUND,
          },
          {
            name: "Outbound",
            key: "outbound",
            isActive: false,
            description: "Outbound",
            path: Path.OUTBOUND,
          }
        ]
      },
      {
        name: "ADMINISTRATION",
        key: "administration",
        description: "Administration",
        path: Path.ADMINISTRATION,
      },
      {
        name: "REPORTS",
        key: "reports",
        description: "Reports",
        path: Path.REPORT,
      }
    ];