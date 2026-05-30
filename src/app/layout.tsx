import type { Metadata } from "next";
import "./globals.css";

import AuthGuard from "../components/AuthGuard";
import { GlobalStateProvider } from "../components/GlobalStateProvider";

export const metadata: Metadata = {
  title: "AgentWall | AI Security Dashboard",
  description: "Agentic firewall and proxy for monitoring and preventing prompt injections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <GlobalStateProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </GlobalStateProvider>
        </div>
      </body>
    </html>
  );
}
