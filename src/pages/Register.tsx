import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { registerUser } from '../features/auth/authSlice.ts';
import { RegisterData } from '../utils/types';
import Input from '../components/Input.tsx';

const Register: React.FC = () => {
  const [userData, setUserData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate('/');
    } catch (error: any) {
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        setErrors({
          general:
            error.message || 'Registration failed. Please try again later.',
        });
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Register</h2>
      {errors.general && (
        <div className="text-red-500 text-center mb-4">{errors.general}</div>
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <Input
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            value={userData.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
