import React, { useState } from "react";
import { User } from "@/types/userType";
import { useRouter } from 'next/router';


export default function Register() {
const [newUser,setNewUser] = useState<User | null>(null)
const [error, setError] = useState<string | null>(null);
const router = useRouter();
const handleRegistration= async ()=>{
	if(newUser?.password !== newUser?.confirmPassword){
		setError('Les mots de passe ne correspondent pas');
		return;
	}
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
			console.log(data)
			if(data.user) {
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

return (
	<div className="min-h-screen flex items-center justify-center bg-gray-100">
		<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">S&rsquo;enregister</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleRegistration}>
				<div className="mb-4">
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
				<button
					type="submit"
					className="w-full bg-blue-500  hover:bg-primary py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
					>
					S&rsquo;inscrire
				</button>
			</form>
		</div>
	</div>
)
}
