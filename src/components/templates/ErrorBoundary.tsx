import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem", fontFamily: "sans-serif" }}>
          <h2>משהו השתבש</h2>
          <p style={{ color: "#666" }}>אנא רענן את הדף ונסה שנית.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "0.5rem 1.5rem", cursor: "pointer", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            רענן
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
