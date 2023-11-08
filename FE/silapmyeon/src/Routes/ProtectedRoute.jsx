import { useRecoilValue } from "recoil";
// import { isLoginSelector } from "../Recoil/TokenAtom";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IsLoginSelector } from "../Recoil/UserAtom";

const ProtectedRoute = ()=> {
    const isLogin = useRecoilValue(IsLoginSelector);
    const currentLocation = useLocation();
    return isLogin?<Outlet/>:<Navigate to={'/login'} replace state={{redirectedFrom:currentLocation}}/>
}

export default ProtectedRoute;