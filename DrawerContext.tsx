import React, {
  FC,
  createContext,
  useContext,
  useState,
} from "react";

interface DrawerOpenContextProps {
  drawerOpen: boolean;
  setDrawerOpen: (val: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DrawerOpenContext = createContext<DrawerOpenContextProps>(undefined!);

interface Props {
  children: React.ReactElement;
}

const DrawerOpenProvider: FC<Props> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <DrawerOpenContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen: (value) => {
          setDrawerOpen(value);
        },
      }}
    >
      {children}
    </DrawerOpenContext.Provider>
  );
};

export const useDrawerOpenContext = () => useContext(DrawerOpenContext);

export default DrawerOpenProvider;
