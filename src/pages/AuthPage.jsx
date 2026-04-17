import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        {/* TOP HEADER */}
        {activeTab === "" && (
          <div style={styles.titleBox}>
            <h1 style={styles.title}>Welcome</h1>

            <div style={styles.buttonRow}>
              <button
                onClick={() => setActiveTab("login")}
                style={styles.blueButton}
              >
                Login
              </button>

              <button
                onClick={() => setActiveTab("register")}
                style={styles.blueButton}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* LOGIN */}
        {activeTab === "login" && (
          <>
            <button
              onClick={() => setActiveTab("")}
              style={styles.backButton}
            >
              ⬅ Back
            </button>

            <Login setActiveTab={setActiveTab} />
          </>
        )}

        {/* REGISTER */}
        {activeTab === "register" && (
          <>
            <button
              onClick={() => setActiveTab("")}
              style={styles.backButton}
            >
              ⬅ Back
            </button>

            <Register setActiveTab={setActiveTab} />
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6ff",
  },

  box: {
    width: 350,
    padding: 30,
    textAlign: "center",
    borderRadius: 12,
    background: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  title: {
    color: "blue",
    fontWeight: "bold",
    marginBottom: 20,
  },

  titleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  buttonRow: {
    display: "flex",
    gap: 10,
  },

  blueButton: {
    background: "blue",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  backButton: {
    marginBottom: 15,
    background: "transparent",
    border: "none",
    color: "blue",
    fontWeight: "bold",
    cursor: "pointer",
  },
};