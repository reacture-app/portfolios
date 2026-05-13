// 🆕 NEW: useTheme custom hook (from Lesson 31)
function useTheme() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "dark"
  );
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

// 🆕 NEW: Central style helpers object
const styles = {
  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.25s ease",
    marginRight: "10px",
    marginBottom: "10px",
    backdropFilter: "blur(10px)"
  },

  // 🆕 NEW: card() is a function — takes isDark so it adapts to the theme
  card: (dark) => ({
    background: dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.7)",
    border: dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
    borderRadius: "24px",
    padding: "28px",
    backdropFilter: "blur(20px)",
    boxShadow: dark
      ? "0 10px 30px rgba(0,0,0,0.4)"
      : "0 10px 30px rgba(0,0,0,0.08)"
  })
};

// 🔄 EVOLVED: Header now receives isDark prop and uses rich typography
function Header({ isDark }) {
  return (
    <header style={{ padding: "50px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "10px", fontWeight: "800" }}>
        Your Name
      </h1>
      <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>
        Frontend Developer • React Enthusiast • UI Designer
      </p>
    </header>
  );
}

// 🔄 EVOLVED: About uses styles.card() for the glassmorphism card look
function About({ isDark }) {
  const [visits, setVisits] = React.useState(0);

  return (
    <section style={styles.card(isDark)}>
      <h2 style={{ marginBottom: "15px", fontSize: "2rem" }}>About Me</h2>
      <p style={{ lineHeight: "1.8", opacity: 0.85 }}>
        I'm a passionate frontend developer focused on creating modern,
        interactive, and scalable web experiences using React.
      </p>
      <div style={{ marginTop: "25px", display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
        <button
          onClick={() => setVisits((v) => v + 1)}
          style={{
            ...styles.button,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white"
          }}
        >
          👁️ View Profile
        </button>
        <span style={{ fontWeight: "600", opacity: 0.7 }}>
          Profile Views: {visits}
        </span>
      </div>
    </section>
  );
}

// 🔄 EVOLVED: Projects uses styled filter buttons + card grid
function Projects({ isDark }) {
  const [filter, setFilter] = React.useState("All");

  const projects = [
    { id: 1, name: "Portfolio Website", type: "React" },
    { id: 2, name: "Weather App",       type: "React" },
    { id: 3, name: "Landing Page",      type: "HTML"  },
    { id: 4, name: "Task Tracker",      type: "React" }
  ];

  const visibleProjects = filter === "All"
    ? projects
    : projects.filter((p) => p.type === filter);

  const filterBtn = (active) => ({
    ...styles.button,
    background: active
      ? "linear-gradient(135deg,#0ea5e9,#2563eb)"
      : isDark ? "#2a2a2a" : "#ececec",
    color: active ? "white" : isDark ? "white" : "black"
  });

  return (
    <section style={styles.card(isDark)}>
      <h2 style={{ marginBottom: "20px", fontSize: "2rem" }}>
        Projects ({visibleProjects.length})
      </h2>
      {/* 🆕 NEW: Styled filter bar */}
      <div style={{ marginBottom: "25px" }}>
        {["All", "React", "HTML"].map((f) => (
          <button key={f} style={filterBtn(filter === f)} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      {/* 🆕 NEW: Project cards grid */}
      <div style={{ display: "grid", gap: "18px" }}>
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "0.25s"
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{project.name}</h3>
            <p style={{ opacity: 0.7 }}>{project.type} Project</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 🔄 EVOLVED: Contact uses styled inputs + glassmorphism card
function Contact({ isDark }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const inputStyle = {
    width: "100%", padding: "14px", borderRadius: "14px",
    border: "none", outline: "none", marginBottom: "15px",
    background: isDark ? "#2a2a2a" : "#f1f1f1",
    color: isDark ? "white" : "black", fontSize: "1rem"
  };

  return (
    <section style={styles.card(isDark)}>
      <h2 style={{ marginBottom: "20px", fontSize: "2rem" }}>Contact</h2>
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...styles.button,
          background: "linear-gradient(135deg,#ec4899,#f43f5e)",
          color: "white"
        }}
      >
        {open ? "Hide Form ✕" : "Show Form ✉️"}
      </button>
      {open && (
        <div style={{ marginTop: "25px" }}>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          <input style={inputStyle} type="email" placeholder="Your Email" />
          <textarea style={{ ...inputStyle, minHeight: "120px", resize: "none" }} placeholder="Your Message" />
          <button style={{ ...styles.button, background: "linear-gradient(135deg,#10b981,#059669)", color: "white" }}>
            Send Message 🚀
          </button>
          <p style={{ marginTop: "15px", opacity: 0.7 }}>Hello, {name || "Guest"} 👋</p>
        </div>
      )}
    </section>
  );
}

// 🔄 EVOLVED: App wires everything together with a gradient background
function App() {
  const [theme, setTheme] = useTheme();
  const [tab, setTab] = React.useState("About");
  const isDark = theme === "dark";

  const navBtn = (active) => ({
    ...styles.button,
    background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
    color: active ? "white" : isDark ? "white" : "black",
    border: active ? "none" : `1px solid ${isDark ? "#333" : "#ddd"}`
  });

  return (
    <main style={{
      minHeight: "100vh",
      background: isDark
        ? "linear-gradient(to bottom right,#0f172a,#111827,#020617)"
        : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      color: isDark ? "white" : "black",
      transition: "0.3s ease",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* 🆕 NEW: Top-right theme toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{ ...styles.button, background: isDark ? "#ffffff" : "#111827", color: isDark ? "#111827" : "white" }}
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Header isDark={isDark} />

        {/* 🆕 NEW: Centered styled nav */}
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "30px" }}>
          {["About", "Projects", "Contact"].map((t) => (
            <button key={t} style={navBtn(tab === t)} onClick={() => setTab(t)}>{t}</button>
          ))}
        </nav>

        <div>
          {tab === "About"    && <About    isDark={isDark} />}
          {tab === "Projects" && <Projects isDark={isDark} />}
          {tab === "Contact"  && <Contact  isDark={isDark} />}
        </div>

        <footer style={{ marginTop: "40px", textAlign: "center", opacity: 0.6, paddingBottom: "20px" }}>
          © {new Date().getFullYear()} Your Name • Built with React 🚀
        </footer>
      </div>
    </main>
  );
}