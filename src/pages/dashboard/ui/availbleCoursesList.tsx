
import React from 'react';
import { Course } from '@/types/courseType';
import { useRouter } from 'next/router';


export default function AvailableCoursesList({className="", courses }: { className?:string,courses: Course[] }) {
    const router = useRouter();
    return (
        <div className={`p-6 bg-gray-50 rounded-lg shadow-md xl:w-5/12 w-full  ${className}`}>
            <h1 className="text-3xl font-semibold text-center mb-6">Inscription aux cours</h1>
            <ul className="space-y-4">
                {courses?.map((course) => (
                    <li key={course.id} className="bg-white cursor-pointer p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300" onClick={()=>{router.push(`/courses/${course.id}`)}}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <h2 className="text-xl font-medium">{course.title}</h2>
                            <p className="text-gray-500">{course.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
