import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    try {
      const user = await login(data.email, data.password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4D6D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C5CFF]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-display font-bold text-white text-2xl">Pulse <span className="text-[#FF4D6D]">SA</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-[#B6BDC9] mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          {/* Demo credentials hint */}
          <div className="mb-6 p-3 bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 rounded-xl text-xs text-[#B6BDC9]">
            <p className="font-semibold text-[#7C5CFF] mb-1">Demo Credentials</p>
            <p>Admin: admin@pulsesa.co.za / admin123</p>
            <p>User: user@pulsesa.co.za / user123</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<MdEmail size={18} />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
            />

            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={<MdLock size={18} />}
              iconRight={
                <button type="button" onClick={() => setShowPass(p => !p)} className="hover:text-white transition-colors">
                  {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              }
              error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Min 4 characters' } })}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#FF4D6D]" />
                <span className="text-[#B6BDC9]">Remember me</span>
              </label>
              <Link to="#" className="text-[#FF4D6D] hover:underline">Forgot password?</Link>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#EF4444] text-center">
                {error}
              </motion.p>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-[#B6BDC9] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#FF4D6D] hover:underline font-medium">Create one</Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#B6BDC9] mt-6">
          <Link to="/" className="hover:text-white transition-colors">← Back to Pulse SA</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
