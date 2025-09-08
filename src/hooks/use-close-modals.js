import { useCallback } from "react";

export function useCloseAllModals() {
  const closeAllModals = useCallback(() => {
    document.querySelectorAll(".modal.show").forEach((modal) => {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }, []);

  return closeAllModals;
}
