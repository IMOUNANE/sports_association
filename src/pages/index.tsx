
// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from '@/utils/Cookies';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res) {
        const data = await res.json();
        if(data.token) {
          setCookie('token', data.token);
          setCookie('user', data.user);
          router.push('/dashboard');
        }else{
          setError(data.error);
        }
      
      } else {
       console.log("error",res)
      }
    } catch {
      setError('Une erreur s\'est produite');
    }
  };
  const handleRegisterRedirect = () => {
    router.push('/register'); // Redirige vers la page d'inscription
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="py-2 px-4 rounded-md transition duration-300 min-w-40"
          >
            Se connecter
          </Button>
        </form>
        <div className="mt-1 flex flex-col items-center py-2 px-4 rounded-md">
          <Button onClick={handleRegisterRedirect} className='min-w-40'>
            S&rsquo;inscrire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
