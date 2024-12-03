import "./globals.css";
import SessionProvider from "./SessionProvider";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html>
        <head>
          <title>Github Insights</title>
        </head>
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
