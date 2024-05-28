import { ReactNode } from "react";

function LoadingDots  ({ children }: { children: ReactNode }) {
    return <ul className="dots flex gap-5 font-bold">{children}</ul>;
};

export default LoadingDots