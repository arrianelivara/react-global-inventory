import { useCallback, useMemo, useState } from "react";

const useSelectItems = ({
  logKey = "none",
  items = [],
  key = "id",
  indeterminate = false,
  setValue = () => {},
  ignored = [0],
  selected: selectedProps = null,
  setSelected: setSelectedProps,
  defaultValue = {},
}) => {
  const [selectedState, setSelectedState] = useState(defaultValue);
  const [selected, setSelected] = useMemo(() => {
    if (selectedProps) {
      return [selectedProps, setSelectedProps];
    }
    return [selectedState, setSelectedState];
  }, [selectedProps, setSelectedProps, selectedState, setSelectedState]);

  const normalizeItems = useMemo(() => {
    const obj = {};
    if (items.length) {
      items.forEach((item, index) => {
        if (ignored.includes(item.id)) {
          return;
        }
        obj[item[key]] = { ...item, index };
      });
    }
    return obj;
  }, [items, key, ignored]);

  const denormalizeItems = useMemo(() => {
    return Object.keys(selected).map((id) => parseInt(id));
  }, [selected]);

  const options = useMemo(() => {
    return Object.keys(normalizeItems).map((k) => {
      return normalizeItems[k];
    });
  }, [normalizeItems]);

  const isAllSelected = useMemo(() => {
    const noOfSelectedItems = Object.keys(selected).length;
    const hasFalseValues = Object.values(selected).includes(false);

    if (!options.length || Object.keys(selected).length === 0) {
      return false;
    }
    if (noOfSelectedItems === options.length && noOfSelectedItems > 0 && !hasFalseValues) {
      return true;
    }
    if (noOfSelectedItems !== options.length && indeterminate && !hasFalseValues) {
      return "indeterminate";
    }
    return false;
  }, [selected, options, indeterminate]);

  const value = useMemo(() => {
    return Object.keys(selected).map((k) => {
      return normalizeItems[k];
    });
  }, [selected, normalizeItems]);

  const handleSetSelected = useCallback(
    (id) => {
      const values = { ...selected };

      if (values[id]) {
        delete values[id];
      } else {
        values[id] = {
          ...normalizeItems[id],
          checked: true,
        };
      }
      setSelected(values);
      setValue(
        Object.keys(values).map((k) => {
          return normalizeItems[k];
        })
      );
    },
    [selected, normalizeItems, setSelected, setValue]
  );

  const setSelectAll = useCallback(() => {
    if (!isAllSelected || denormalizeItems.length === Object.keys(defaultValue).length) {
      const obj = {};
      options.forEach((item) => {
        obj[item[key]] = {
          ...normalizeItems[item[key]],
          checked: true,
        };
      });
      setSelected(obj);
      setValue(
        Object.keys(obj).map((k) => {
          return normalizeItems[k];
        })
      );
    } else {
      setValue(defaultValue || []);
      setSelected(defaultValue || {});
    }
  }, [
    denormalizeItems,
    defaultValue,
    isAllSelected,
    setSelected,
    normalizeItems,
    options,
    key,
    setValue,
  ]);

  const selectedCount = useMemo(() => {
    return Object.keys(selected).length || 0;
  }, [selected]);

  const clearSelected = useCallback(() => {
    setSelected({});
  }, [setSelected]);

  return {
    selected,
    selectedCount,
    setSelected: handleSetSelected,
    replaceSelected: setSelected,
    isAllSelected,
    setSelectAll,
    value,
    options,
    denormalizeItems,
    clearSelected,
  };
};

export default useSelectItems;
