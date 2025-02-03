import { ReactNode } from "react";
import NavBar from "../NavBar/NavBar";

const ScreenContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 min-h-[100vh] w-[100vw]  bg-base-100 flex flex-col justify-start items-start ${className}`}
    >
      <NavBar />
      {children}
    </div>
  );
};

export default ScreenContainer;
