import { FC, ReactNode } from "react";
import"@/assets/css/main.css";

interface Props {
  children: Readonly<ReactNode>;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
