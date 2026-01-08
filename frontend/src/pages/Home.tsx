import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <nav className="bg-light-surface dark:bg-dark-surface shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">
              sharpl
            </h1>
            <div className="flex gap-4 items-center">
              <Button variant="secondary" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">
            Welcome to sharpl
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
            Your amazing application starts here
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate("/register")}>
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
