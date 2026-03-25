import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EthioLocal Web",
  description: "Next.js front-end for EthioLocal API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 24, maxWidth: 720 }}>
        {children}
      </body>
    </html>
  );
}
