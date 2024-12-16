import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice.ts';
import { LoginData } from '../utils/types.ts';
import { AppDispatch } from '../store/index.ts';
import { Link } from 'react-router-dom';
import Input from '../components/Input.tsx';

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(userData)).unwrap();
      navigate('/personalized-feed');
    } catch (err) {
      console.log(err);
      setLoginError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-2xl mb-4">Login</h2>
      {loginError && <div className="text-red-500">{loginError}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm">
        <Link to="/forgot-password" className="text-blue-600">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
