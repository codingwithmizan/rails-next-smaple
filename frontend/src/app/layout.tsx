import { FC, ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "@/assets/css/main.css";

interface Props {
  children: Readonly<ReactNode>;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
