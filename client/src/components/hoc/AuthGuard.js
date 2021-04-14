import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

export default function AuthGuard(ComposedComponent, roleCheck = false) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);

    useEffect(() => {
      if (!users.auth) {
        props.history.push("/");
      } else {
        if (roleCheck && users.data.role === "user") {
          props.history.push("/dashboard");
        } else {
          setIsAuth(true);
        }
      }
    }, [props, users]);

    if (!isAuth) {
      return (
        <div className="main_loader">
          <Loader />
        </div>
      );
    } else {
      return <ComposedComponent {...props} />;
    }
  };
  return AuthenticationCheck;
}
