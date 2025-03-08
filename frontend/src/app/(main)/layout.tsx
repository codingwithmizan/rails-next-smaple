import { FC, ReactNode } from "react";
import { Navbar } from "@/components/common";

interface Props {
  children: Readonly<ReactNode>;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
