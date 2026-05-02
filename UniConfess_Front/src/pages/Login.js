import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../service/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await LoginUser({ email, password });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); 
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login Dark</h2>
        
        <input 
          type="email" 
          placeholder="admin@test.com"
          value={email}
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white outline-none focus:border-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="1234"
          value={password}
          className="w-full p-3 mb-6 bg-gray-800 border border-gray-700 rounded text-white outline-none focus:border-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition"
        >
          {isLoading ? 'Entrando...' : 'Entrar al Dashboard'}
        </button>
      </form>
    </div>
  );
};

export default Login;
