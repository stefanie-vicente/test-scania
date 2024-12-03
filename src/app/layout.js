"use client";

import { SessionProvider } from "next-auth/react";

export default ({ children }) => (
  <html>
    <body>
      <SessionProvider>{children}</SessionProvider>
    </body>
  </html>
);
