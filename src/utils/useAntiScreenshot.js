"use client";
import { useEffect } from "react";

const useAntiScreenshot = () => {
  useEffect(() => {
    // Prevent right-click/context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable standard buttons/keys
    const handleKeyDown = (e) => {
      // Block common keys
      if (e.key === "PrintScreen" || (e.ctrlKey && e.key === "p")) {
        e.preventDefault();
      }
    };

    // For Android: detect potential screenshot attempts via visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // This may trigger when screenshots are taken on some Android devices
        console.log("Possible screenshot attempt detected");
      }
    };

    // For Android: handle double-tap (which might activate screenshot UI)
    let lastTap = 0;
    const handleTouchEnd = (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
      }
      lastTap = currentTime;
    };

    // Register event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("touchend", handleTouchEnd);

    // Block common buttons
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach((button) => {
      const originalClick = button.onclick;
      button.onclick = (e) => {
        if (button.dataset.allowClick !== "true") {
          e.preventDefault();
          return false;
        }
        if (originalClick) return originalClick.call(button, e);
      };
    });

    return () => {
      // Clean up
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};

export default useAntiScreenshot;
