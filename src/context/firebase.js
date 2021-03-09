import { createContext } from "react";

import { firebase, FieldValue } from "../lib/firebase";

const { Provider, Consumer } = createContext(null);

const FirebaseProvider = ({ children }) => {
  return (
    <Provider
      value={{
        firebase,
        FieldValue,
      }}
    >
      {children}
    </Provider>
  );
};

export { FirebaseProvider, Consumer as FirebaseConsumer };
