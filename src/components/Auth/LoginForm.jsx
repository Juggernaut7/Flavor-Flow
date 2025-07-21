import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { APP_NAME } from '../../utils/constants';

const LoginForm = ({ onNavigate, setModalMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      setModalMessage({ type: 'success', message: 'Login successful!' });
      onNavigate('dashboard');
    } else {
      setModalMessage({ type: 'error', message: result.message || 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md mx-auto border border-primary-100 w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4 sm:mb-6 text-center">Login to {APP_NAME}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="mt-4 sm:mt-6 text-center text-text-light text-sm sm:text-base">
        Don't have an account?{' '}
        <button onClick={() => onNavigate('register')} className="text-primary-500 hover:underline font-semibold">
          Register here
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;