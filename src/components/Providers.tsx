"use client";

import { MantineProvider } from "@mantine/core";

const Providers = ({ children }: any) => {
  return <MantineProvider>{children}</MantineProvider>;
};


export default Providers