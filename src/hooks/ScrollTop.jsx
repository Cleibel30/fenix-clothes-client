import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Salta al tope sin animación
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
