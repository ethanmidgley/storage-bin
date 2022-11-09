import type Prisma from "@prisma/client";
import { Link } from "@remix-run/react";
import { Box } from "./Box";
import { Button } from "./Button";

export interface ItemProps {
  item: Prisma.Item;
  className?: string;
  children?: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ item, className, children }) => {
  return (
    <Box className={`p-2 mt-4 flex flex-col ${className}`}>
      <div className="flex flex-row justify-between">
        <p>{item?.id}</p>
        <div className="flex flex-row">
          <Link className="mr-4" to={`/item/${item.id}`} target="_blank">
            <Button>Preview</Button>
          </Link>
          {children}
        </div>
      </div>
    </Box>
  );
};
