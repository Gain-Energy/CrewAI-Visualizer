"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isMissionsActive, setIsMissionsActive] = useState(false);
  const [isAgentsActive, setIsAgentsActive] = useState(false);
  const [isMarketplaceActive, setIsMarketplaceActive] = useState(false);
  const [isRegistryActive, setIsRegistryActive] = useState(false);

  useEffect(() => {
    // Reset all states
    setIsMissionsActive(false);
    setIsAgentsActive(false);
    setIsMarketplaceActive(false);
    setIsRegistryActive(false);

    // Check current path
    switch (pathname) {
      case "/missions":
        setIsMissionsActive(true);
        break;
      case "/agents":
        setIsAgentsActive(true);
        break;
      case "/marketplace":
      case "/marketplace/search":
      case "/marketplace/categories":
        setIsMarketplaceActive(true);
        break;
      case "/registry":
      case "/registry/publish":
      case "/registry/manage":
      case "/registry/analytics":
        setIsRegistryActive(true);
        break;
      default:
        // Check if path starts with any of these routes
        if (pathname?.startsWith('/marketplace/')) {
          setIsMarketplaceActive(true);
        } else if (pathname?.startsWith('/registry/')) {
          setIsRegistryActive(true);
        }
        break;
    }
  }, [pathname]);

  return {
    isMissionsActive,
    isAgentsActive,
    isMarketplaceActive,
    isRegistryActive,
  };
};

export default useNavigation;