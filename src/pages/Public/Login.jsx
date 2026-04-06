import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleLogin from '../../utils/login';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  document.title = 'SuggestMe | Login';
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for form fields and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  // Handle input changes with inline validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await handleLogin({ email, password });
      login(userData);
      toast.success('Login successful! Redirecting...');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {/* Card container with DaisyUI card styles */}
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-2xl">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">SuggestMe</h2>
          <p className="text-base-content/70 text-center text-sm mb-6">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
                disabled={isLoading}
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''} focus:outline-none`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <label className="label">
                  <span id="email-error" className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) }))}
                disabled={isLoading}
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''} focus:outline-none`}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && (
                <label className="label">
                  <span id="password-error" className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Helper links */}
            <div className="flex items-center justify-center mt-6 text-sm">
              <a href="/forgot-password" className="link link-primary link-hover">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;