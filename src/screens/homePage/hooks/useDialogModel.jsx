import React, { useCallback, useState } from "react";

export default function useDialogModel(Component) {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const dialogComponent = useCallback(
    (...props) => {
      if (!open) return null;
      if (Component) {
        return (
          <Component open={open} onClose={() => setOpen(false)} {...props} />
        );
      }
    },
    [open, Component]
  );
  return [dialogComponent, openDialog ];
}
