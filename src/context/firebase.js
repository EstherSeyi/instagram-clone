import { createContext } from "react";

import { firebase, FieldValue } from "../lib/firebase";

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        FieldValue,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, FirebaseContext };
