import React, { useState, useContext, useEffect } from "react";

const ModalContext = React.createContext();

export function useMod() {
  return useContext(ModalContext);
}

const ModalProvider = ({ children }) => {
  const [err, setErr] = useState(null);

  return (
    <ModalContext.Provider value={{ err, setErr }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
