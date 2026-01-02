import React from "react";
import {
  DirectionsCar,
  ElectricBolt,
  ShoppingBag,
  Restaurant,
  Delete,
  LocalActivity,
} from "@mui/icons-material";

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    TRAVEL: <DirectionsCar />,
    ENERGY: <ElectricBolt />,
    PURCHASES: <ShoppingBag />,
    FOOD: <Restaurant />,
    WASTE: <Delete />,
  };
  return icons[category] || <LocalActivity />;
};
