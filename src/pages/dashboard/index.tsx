import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Contribution from "./ui/contribution";
import MembersList from "./ui/membersList";
import CoursesList from "./ui/coursesList";


export default function Dashboard() {
    const userCookie = getCookie('user');
    const [members,setMembers] = useState([]);
    const [contribution,setContribution] = useState(null);
    const [courses, setCourses] = useState([])

    
	
    const getMembers = async() => {
        const errorMessage ="Une erreur s\'est produite"
        try{
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
    const getCourses = async () => {
        const errorMessage ="Une erreur s\'est produite"
        
        try{ 
			if(userCookie){
				const res = await fetch('/api/courses', {
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
                    setCourses(response.courses)
				}
			}
		}catch{
            console.error(errorMessage)
		}
    }
    const getContribution = async ()=>{
        const errorMessage ="Une erreur s\'est produite"
        
        try{  
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
        getCourses()
    },[])

    return (
        <main>
            <div className="flex flex-wrap justify-between">
                <div className="flex flex-col gap-5">
                    <Contribution contribution={contribution} />
                    <CoursesList courses={courses}/>
                </div>
               
                <MembersList className="w-full" members={members} />
            </div>
        </main>
    )
}
