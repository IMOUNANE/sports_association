import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Contribution from "./ui/contribution";
import MembersList from "./ui/membersList";


export default function Dashboard() {
    let user = null;
    const userCookie = getCookie('user');
    const [members,setMembers] = useState([]);
    const [contribution,setContribution] = useState(null);
    if(userCookie){
        user = JSON.parse(userCookie);
    }
	
    const getMembers = async() => {
        const errorMessage ="Une erreur s\'est produite"
        try{
			const userCookie = getCookie('user');
			if(userCookie){

				const res = await fetch('/api/members', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'authorization': `Bearer ${getCookie('token')}`
					},
				});
				if(res.status === 500){
					console.error(errorMessage)
				}else{
                    const response = await res.json();
                    setMembers(response.data)
				}
			}
		}catch{
            console.error(errorMessage)
		}
    }
    const getContribution = async ()=>{
        const errorMessage ="Une erreur s\'est produite"
        
        try{  
            const userCookie = getCookie('user');
			if(userCookie){
				const res = await fetch('/api/contribution', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'authorization': `Bearer ${getCookie('token')}`
					},
                  
				});
				if(res.status === 500){
					console.error(errorMessage)
				}else{
                    const response = await res.json();
                    setContribution(response.contribution)
				}
			}
		}catch{
            console.error(errorMessage)
		}
    }

    useEffect(() => {
        getMembers()
        getContribution()
    },[])

    return (
        <main>
            <div className="flex flex-wrap justify-between">
                <Contribution contribution={contribution} />
                <MembersList className="w-full" members={members} />
            </div>

       
        </main>
    )
}
