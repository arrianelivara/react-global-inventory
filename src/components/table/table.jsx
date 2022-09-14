import React, { useCallback, useState } from "react";
import { Text, SortButton, Checkbox, Skeleton } from "components";
import classnames from "classnames";
import styles from "./table.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Popover } from "antd";

const Table = ({
  columns = [],
  data = [],
  className,
  tableStyle = "fixed",
  sort = { value: "off", key: "" },
  setSort,
  selected = null,
  setSelected = null,
  setSelectAll,
  isAllSelected,
  loading,
  minWidth = "1024px",
  disabled = [],
  loader = 10,
  id,
}) => {
  const [activeRows, setActiveRows] = useState({});
  const alignToJustify = useCallback((align) => {
    if (align === "center") return "center";
    if (align === "right") return "end";
    return "start";
  }, []);

  const renderCheckbox = useCallback(
    (row) => {
      return (
        <span
          className={classnames("w-12 text-center flex items-center mr-md", {
            invisible: disabled.includes(row.id),
          })}
        >
          <Checkbox
            className={classnames("m-auto")}
            value={selected[row.id]}
            onChange={() => {
              setSelected(row.id);
            }}
          />
        </span>
      );
    },
    [selected, setSelected, disabled]
  );

  const mapRowToColumn = (row, rowIndex, { child, parent }) => {
    return (
      <tr className={classnames({ "cursor-pointer": parent })} id={rowIndex} key={uuidv4()}>
        {columns.map((column, index) => {
          if (!column) {
            return null;
          }
          return (
            <td
              className={classnames(
                `bg-white py-sm px-md align-baseline min-h-14`,
                {
                  "border-r-2": column.divider,
                  [`sticky ${column.fixed}`]: column.fixed,
                  "border-solid border-b border-gray-lightest": rowIndex + 1 !== data.length,
                },
                styles.fixed
              )}
              style={{
                minWidth: column.fixWidth,
                maxWidth: column.maxWidth,
              }}
              key={uuidv4()}
              onClick={() => {
                if (parent && !column?.actions) {
                  setActiveRows({
                    ...activeRows,
                    [rowIndex]: !activeRows?.[rowIndex],
                  });
                }
              }}
            >
              <div
                className={classnames(`flex items-baseline break-word`, {
                  [`justify-${alignToJustify(column.align)}`]: column?.align,
                  "cursor-pointer": column?.actions,
                  "pl-lg": child,
                })}
              >
                {index === 0 && selected && !child && renderCheckbox(row, rowIndex)}
                <div
                  className={classnames({
                    [`${styles.content}`]: index === 0,
                    "opacity-40": row["opaque"],
                  })}
                >
                  {column?.actions &&
                  !child &&
                  (column?.exclude?.indexOf(rowIndex) === -1 || !column?.exclude) ? (
                    <Popover
                      overlayClassName="options-popover"
                      placement="bottomRight"
                      title={column?.actionTitle}
                      content={column?.actionOptions.map((option) => {
                        return (
                          option && (
                            <button
                              key={uuidv4()}
                              className={classnames(
                                `border-none outline-none w-full text-left`,
                                option?.className
                              )}
                              onClick={() => {
                                option.onClick(row);
                              }}
                            >
                              {option.render ? option.render(row) : option.text}
                            </button>
                          )
                        );
                      })}
                      trigger="click"
                      arrow={false}
                    >
                      <div className="text-right">
                        <i
                          className={classnames(`icon-options align-middle`)}
                          style={{
                            fontSize: 3,
                          }}
                        />
                      </div>
                    </Popover>
                  ) : column?.custom ? (
                    column.callback ? (
                      row[column.key]({
                        toggleRowItems: () => {
                          if (parent) {
                            setActiveRows({
                              ...activeRows,
                              [rowIndex]: !activeRows?.[rowIndex],
                            });
                          }
                        },
                        active: activeRows?.[rowIndex],
                        parent,
                      })
                    ) : (
                      row[column?.key] || ""
                    )
                  ) : (
                    <Text className={classnames({ "whitespace-nowrap": column?.nowrap })}>
                      {row[column?.key] !== null && row[column?.key] !== null
                        ? row[column.key]
                        : ""}
                    </Text>
                  )}
                </div>
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <table
      id={id}
      className={classnames(
        `table-${tableStyle} table w-full shadow-md`,
        styles.container,
        className
      )}
      style={{
        minWidth,
      }}
    >
      <thead>
        <tr>
          {columns.map((column, index) => {
            if (!column) {
              return null;
            }
            const columnKey = column.key;
            return (
              <th
                className={classnames(
                  `bg-white py-sm px-md border-b border-gray-lightest`,
                  column.classNames,
                  {
                    [`sticky ${column.width}`]: column.width,
                    [`text-${column.align}`]: column.align,
                    [`text-left`]: !column.align,
                    "border-r-2": column.divider,
                    [`sticky ${column.fixed}`]: column.fixed,
                    "hover:bg-gray-lightest": column.sort,
                  }
                )}
                key={uuidv4()}
              >
                <h4
                  className={classnames(`text-thead flex items-baseline text-washed-dark min-h`, {
                    [`justify-${alignToJustify(column.align)}`]: column?.align,
                  })}
                >
                  {index === 0 && selected && !loading && (
                    <span className={classnames("w-12 text-center mr-md")}>
                      <Checkbox
                        value={isAllSelected}
                        className={classnames("m-auto")}
                        onChange={() => {
                          setSelectAll();
                        }}
                      />
                    </span>
                  )}
                  {column.sort ? (
                    <SortButton
                      className="font-semibold"
                      align={column.align}
                      title={column.text}
                      sort={sort.key === columnKey ? sort.value : "off"}
                      onClick={(value) => {
                        setSort({
                          value,
                          key: columnKey,
                        });
                      }}
                    />
                  ) : (
                    <span className="text-thead text-blue font-semibold">{column.text}</span>
                  )}
                </h4>
              </th>
            );
          })}
        </tr>
      </thead>

      {!loading ? (
        <tbody>
          {data.map((row, rowIndex) => {
            const r = mapRowToColumn(row, rowIndex, {
              parent: Boolean(row._rowItems),
            });

            const childRow =
              row._rowItems && activeRows[rowIndex]
                ? row._rowItems.map((ri, riIndex) => {
                    return mapRowToColumn(ri, `${rowIndex}-${riIndex}`, {
                      child: true,
                      parentRowIndex: rowIndex,
                    });
                  })
                : null;
            return [r, childRow].map((renderRow) => {
              return renderRow;
            });
          })}
        </tbody>
      ) : (
        <tbody key={uuidv4()}>
          {Array(loader)
            .fill(1)
            .map(() => {
              return (
                <tr key={uuidv4()}>
                  {columns.map((column) => {
                    if (!column) {
                      return null;
                    }
                    return (
                      <td
                        key={uuidv4()}
                        className={classnames(
                          `bg-white border-solid border-b border-gray-lightest py-sm px-md align-baseline min-h-14`,
                          {
                            "border-r-2": column.divider,
                            [`text-${column.align}`]: column.align,
                          }
                        )}
                      >
                        <Skeleton single />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      )}
    </table>
  );
};

export default Table;
