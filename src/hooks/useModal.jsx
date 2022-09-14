import { useMemo, useState, useCallback } from "react";

const useModal = (onClose) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);

  const show = useCallback(
    (s = null) => {
      setOpen(true);
      setState(s);
    },
    [setOpen, setState]
  );

  const close = useCallback(() => {
    if (onClose) {
      onClose(() => {
        setOpen(false);
      });
    }
    setOpen(false);
    setState(null);
  }, [setState, onClose]);

  return useMemo(() => {
    return { show: (s) => show(s), onClose: () => close(), close: () => close(), open, ...state };
  }, [state, open, close, show]);
};

export default useModal;
