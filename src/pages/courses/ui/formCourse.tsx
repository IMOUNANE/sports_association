import React, { useState } from 'react'
import { Course } from '@/types/courseType'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getCookie } from 'cookies-next'
import { toast, Toaster } from 'sonner'


export default function FormCourse() {
    const [course, setCourse] = useState<Course |null>(null)
    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const errorMessage ="Une erreur s\'est produite"
        try {
            let res= null
            const user= getCookie('user')
            if(user) {
                res = await fetch('/api/course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${getCookie('token')}`
                    },
                    body: JSON.stringify({	
                        title: course?.title,
                        owner:  JSON.parse(user)?.id,
                        description: course?.description,
                        location: course?.location,
                    }),
                });
            }
			
			if (res) {
				if(res.status === 500){
                    toast.success(errorMessage)
				}else{
                    toast.success('Le cours a été créé avec succès')
                }
			} else {
				console.log("error",res)
			}
		} catch {
            toast.success(errorMessage)
		}
    }
    const handleChange=(name: string, value: string)=>{
        setCourse({...course,[name]:value})
    }
  return (
    <form className="max-w-4xl p-6 bg-gray-50 rounded-lg shadow-md flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <h1> Crée votre cour</h1>
        <div>
            <label>Titre :</label>
            <Input
                name="title"
                type="text" 
                value={course?.title ?? ''} 
                onChange={(e) => handleChange("title",e.target.value)} 
                required 
            />
        </div>
        <div>
            <label>Description :</label>
            <Textarea 
                value={course?.description ?? ''} 
                onChange={(e) =>  handleChange("description",e.target.value)} 
            />
        </div>
        <div>
            <label>Emplacement :</label>
            <Input 
                type="text" 
                value={course?.location} 
                onChange={(e) => handleChange("location",e.target.value)} 
                required 
            />
        </div>
        <Toaster />
        <Button type="submit">Créer le cours</Button>
    </form>
  )
}
