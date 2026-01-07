import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginRequest } from "../store/slices/authSlice";
import { useAnimateOnRender } from "../hooks/transitions";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const { ref, style } = useAnimateOnRender();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // // Dispatch the login request action - saga will handle the async logic
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <div className="w-full max-w-md">
        <div
          ref={ref}
          style={style}
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8 flex space-y-2 flex-col"
        >
          <h1
            className={`text-2xl font-bold text-light-text-primary dark:text-dark-text-primary bg-clip-text`}
          >
            Sharpl
          </h1>
          <div className="text-left mb-8">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/40 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Input
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-light-CTA dark:text-dark-CTA-text border-light-border dark:border-dark-border rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-light-CTA dark:text-dark-primary hover:text-light-primary hover:dark:text-dark-primary font-medium"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
              fullWidth
              variant="primary"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center flex space-x-2 items-center">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Don't have an account?
            </p>
            <Link
              to="/register"
              className="text-light-CTA dark:text-dark-primary hover:text-light-primary hover:dark:text-dark-primary text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
