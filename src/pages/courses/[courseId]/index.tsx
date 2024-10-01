import { Course } from '@/types/courseType'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function CourseDetail() {
  const [course,setCourse] = useState<Course |null>(null)
  const getCourse = async () => { 
    const res = await fetch(`/api/course?id=${window.location.pathname.split('/')[2]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'authorization': `Bearer ${getCookie('token')}`

      },
    })
    if(res.status === 500){ 
      toast.error('Une erreur s\'est produite')
    }else{
      const response = await res.json();
      setCourse(response.course[0])
    }
  }
  useEffect(() => { 
    getCourse()
    console.log('course', course)
  }, [])
  return (
    <main>
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.title}</h1>
      <p className="text-lg text-gray-700 mb-6">
        {course?.description || 'Pas de description disponible pour ce cours.'}
      </p>
      <div className="flex items-center justify-between text-gray-600">
        <p>
          <strong>Status :</strong> {course?.status ? 'Terminée':"En cour"}
        </p>
        <p>
          <strong>Date de création :</strong> {new Date(course?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    </main>
  )
}
