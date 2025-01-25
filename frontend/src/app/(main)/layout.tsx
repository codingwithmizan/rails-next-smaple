import { FC, ReactNode } from "react";

interface Props {
  children: Readonly<ReactNode>;
}

const MainLayout: FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default MainLayout;
