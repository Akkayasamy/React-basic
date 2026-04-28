import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: "100vh",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "2.5rem",
          background:
            "linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(79,70,229,0.12)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Icon box */}

        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
        }}
      >
        {/* Top nav links */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1.5rem",
            padding: "1.25rem 2rem",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "capitalize",
                paddingBottom: 2,
                color: activeTab === tab ? "#4f46e5" : "#9ca3af",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #4f46e5"
                    : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ width: "100%", maxWidth: 340 }}>
            {activeTab === "login" ? (
              <>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: 6,
                  }}
                >
                  Welcome back
                </p>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#111827",
                    margin: "0 0 1.75rem",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Sign in
                </h3>
                <Login setActiveTab={setActiveTab} />
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "1.25rem",
                    fontSize: 13,
                    color: "#9ca3af",
                  }}
                >
                  No account?{" "}
                  <button
                    onClick={() => setActiveTab("register")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#4f46e5",
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Register →
                  </button>
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: 6,
                  }}
                >
                  Get started
                </p>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#111827",
                    margin: "0 0 1.75rem",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Create account
                </h3>
                <Register setActiveTab={setActiveTab} />
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "1.25rem",
                    fontSize: 13,
                    color: "#9ca3af",
                  }}
                >
                  Have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#4f46e5",
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Sign in →
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}