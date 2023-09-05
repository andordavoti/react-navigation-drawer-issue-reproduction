import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DrawerOpenContextProps {
  drawerOpen: boolean;
  setDrawerIsOpen: () => void;
  setDrawerIsClosed: () => void;
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
        setDrawerIsOpen: () => {
          setDrawerOpen(true);
        },
        setDrawerIsClosed: () => {
          setDrawerOpen(false);
        },
      }}
    >
      {children}
    </DrawerOpenContext.Provider>
  );
};

export const useDrawerOpenContext = () => useContext(DrawerOpenContext);

export default DrawerOpenProvider;
