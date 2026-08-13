import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

import logo from '../assets/logo.png';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/');
    } catch (e) {
      const msg = e.code === 'auth/email-already-in-use'
        ? 'An account with this email already exists'
        : e.code === 'auth/weak-password'
        ? 'Password is too weak'
        : e.message;
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#7C5CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#FF4D6D]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="NightIQ" className="w-10 h-10 rounded-2xl object-contain" />
            <span className="font-display font-bold text-white text-2xl">Night<span className="text-[#FF4D6D]">IQ</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-[#B6BDC9] mt-1">Join thousands of event-goers across South Africa</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Full name"
              type="text"
              placeholder="Thabo Nkosi"
              icon={<MdPerson size={18} />}
              error={errors.name?.message}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
            />

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
              placeholder="Create a strong password"
              icon={<MdLock size={18} />}
              iconRight={
                <button type="button" onClick={() => setShowPass(p => !p)} className="hover:text-white transition-colors">
                  {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              }
              error={errors.password?.message}
              hint="Minimum 8 characters"
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })}
            />

            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              icon={<MdLock size={18} />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: v => v === watch('password') || 'Passwords do not match',
              })}
            />

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" required className="accent-[#FF4D6D] mt-0.5" />
              <span className="text-sm text-[#B6BDC9]">
                I agree to the{' '}
                <Link to="#" className="text-[#FF4D6D] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-[#FF4D6D] hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#EF4444] text-center">
                {error}
              </motion.p>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" loading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-[#B6BDC9] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF4D6D] hover:underline font-medium">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#B6BDC9] mt-6">
          <Link to="/" className="hover:text-white transition-colors">← Back to Pulse SA</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
