import React, { useState } from "react";
import { User } from "@/types/userType";
import { useRouter } from 'next/router';
import { setCookie } from '@/utils/Cookies';
import { Button } from "@/components/ui/button";

export default function Register() {
const [newUser,setNewUser] = useState<User | null>(null)
const [error, setError] = useState<string | null>(null);
const router = useRouter();
const handleRegistration= async (e:React.FormEvent<HTMLFormElement>)=>{
	e.preventDefault();

	if(newUser?.password !== newUser?.confirmPassword){
		setError('Les mots de passe ne correspondent pas');
		return;
	}else{
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({	
					firstname: newUser?.firstname,
					lastname: newUser?.lastname,
					email: newUser?.email,
					password: newUser?.password
				}),
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
	}
}

return (
	<div className="min-h-screen flex items-center justify-center bg-gray-100">
		<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">S&rsquo;enregister</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form className="flex flex-col items-center w-full" onSubmit={handleRegistration}>
				<div className="mb-4 w-full">
					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="firstname">
							Fisrtname
						</label>
						<input
							type="firstname"
							id="firstname"
							value={newUser?.firstname || ''}
							onChange={(e) => setNewUser({...newUser, firstname:e.target.value})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="lastname">
							Lastname
						</label>
						<input
							type="lastname"
							id="lastname"
							value={newUser?.lastname || ''}
							onChange={(e) => setNewUser({...newUser, lastname:e.target.value})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={newUser?.email || ''}
							onChange={(e) => setNewUser({...newUser, email:e.target.value})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="password">
							Mot de passe
						</label>
						<input
							type="password"
							id="password"
							value={newUser?.password || ''}
							onChange={(e) => setNewUser({...newUser, password:e.target.value})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
							Confirmer votre mot de passe
						</label>
						<input
							type="password"
							id="confirmPassword"
							value={newUser?.confirmPassword || ''}
							onChange={(e) => setNewUser({...newUser, confirmPassword:e.target.value})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
				</div>
				<Button
					type="submit"
					className="py-2 px-4 rounded-md transition duration-300 min-w-40"
					>
					S&rsquo;inscrire
				</Button>
			</form>
			<div className="mt-1 flex flex-col items-center py-2 px-4 rounded-md">
				<Button className="min-w-40" onClick={()=>{router.push('/')}}>
				Se connecter
				</Button>
			</div>
		</div>
	</div>
)
}
