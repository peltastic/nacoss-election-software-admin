"use client";

import { store } from "@/lib/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const Providers = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
