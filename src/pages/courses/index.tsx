import React, { useEffect, useState } from 'react'
import FormCourse from './ui/formCourse'
import { getCookie } from 'cookies-next';
import AvailableCoursesList from '../dashboard/ui/availbleCoursesList';


export default function Course() {
  const [courses, setCourses ]= useState([])
  const getAvailableCourses= async () => {
    const errorMessage ="Une erreur s\'est produite"
      
    try{ 
      const userCookie = getCookie('user');
      if(userCookie){
        const res = await fetch('/api/available-courses', {
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
          setCourses(response.availableCourses)
        }
      }
    }catch{
      console.error(errorMessage)
    }
  }
  useEffect(() => {   
      getAvailableCourses()
  }, [])
  
  return (
    <main>
        <div className="flex flex-wrap justify-between">
            <FormCourse/>
            <AvailableCoursesList courses={courses}/>
        </div>
    </main>
  )
}
