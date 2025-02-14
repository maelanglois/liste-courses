import { createContext, useState } from "react";
import type { ListI } from "../interfaces/List.interface";

export const ListContext = createContext<any>();

export default function ListProvider({ children }: any) {

  let [list, setList] = useState<ListI>({
    id: undefined,
    title: undefined,
    elements: {
      oeufs: 0,
      lait: 0,
      eau: 0,
      farine: 0,
      beurre: 0,
    },
    creation_date: undefined,
  });

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}