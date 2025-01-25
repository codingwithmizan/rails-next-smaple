import { FC, ReactNode } from "react";

interface Props {
  children: Readonly<ReactNode>;
}
const AuthLayout: FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default AuthLayout;
