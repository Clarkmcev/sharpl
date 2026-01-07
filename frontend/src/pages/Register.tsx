import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerRequest, clearError } from "../store/slices/authSlice";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAnimateOnRender } from "../hooks/transitions";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const { ref, style } = useAnimateOnRender();

  useEffect(() => {
    // Clear errors when component unmounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    // Dispatch register action
    dispatch(registerRequest({ email, password, name }));
  };

  // Redirect to onboarding after successful registration
  useEffect(() => {
    if (!loading && !error && email) {
      const timer = setTimeout(() => {
        navigate("/onboarding");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, error, email, navigate]);

  return (
    <div
      ref={ref}
      style={style}
      className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg"
    >
      <div className="w-full max-w-md">
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8">
          <div className=" mb-8">
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
              Create Account
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Sign up to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(error || validationError) && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {validationError || error}
              </div>
            )}

            <Input
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />

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
              minLength={6}
              helperText="Must be at least 6 characters"
              required
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              fullWidth
              variant="primary"
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center flex space-x-2 items-center">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="text-light-CTA dark:text-dark-primary hover:text-light-primary hover:dark:text-dark-primary text-sm font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
