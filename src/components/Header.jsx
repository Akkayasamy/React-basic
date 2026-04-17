import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={styles.header}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const styles = {
  header: {
    height: 60,
    background: "#eee",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
    position: "fixed",
    top: 0,
    left: 200,
    right: 0,
  },
};