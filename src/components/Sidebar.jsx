export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3>Sidebar</h3>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 200,
    height: "100vh",
    background: "#111",
    color: "#fff",
    position: "fixed",
    left: 0,
    top: 0,
    padding: 20,
  },
};