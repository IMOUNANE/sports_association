import React, { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button"
export default function Parameters() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [daysDifference, setDaysDifference] = useState(0);
	  
	const calculateDaysDifference = (date: Date) => {
		const today = new Date();
		const timeDiff = date.getTime() - today.getTime();
		const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		return dayDiff;
	};
	  
	const handleDateChange = (date?: Date) => {
		if(date){
			setSelectedDate(date);
			setDaysDifference(calculateDaysDifference(date));
		}
	};
	  
	return (
		<main>
			<h1>Parameters</h1>
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col">
				<h2>Choisissez une date</h2>
				<DatePicker onChange={(date)=>{handleDateChange(date)}}/>
				{selectedDate && (
					<div style={{ marginTop: "20px" }}>
					<p>Date sélectionnée : {selectedDate.toLocaleDateString()}</p>
					<p>
						Prix d'abonnement : {daysDifference > 0 ? daysDifference * 1 : 1} € (1 euro/jour)
					</p>
					</div>
				)}
				<div className="flex justify-end mt-5">
					<Button> Payer {daysDifference > 0 ? daysDifference * 1 : 1} € </Button>
				</div>
			</div>
		</main>
	);
}
