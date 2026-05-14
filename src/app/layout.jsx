import "../index.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "HealthAI Dashboard",
  description: "Advanced Healthcare Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
