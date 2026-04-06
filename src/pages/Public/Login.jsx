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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">SuggestMe</h2>
        <p className="text-gray-600 mb-8 text-center text-sm">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 transition duration-200 disabled:bg-gray-50 disabled:text-gray-500`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) }))}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 transition duration-200 disabled:bg-gray-50 disabled:text-gray-500`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <p id="password-error" className="text-red-600 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign in'
            )}
          </button>


          {/* Helper links */}
          <div className="flex items-center justify-center mt-6 text-sm">
            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 transition">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;