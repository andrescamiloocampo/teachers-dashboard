"use client";

import { type ReactElement } from "react";
import type { ScheduleFormM } from "./ScheduleForm.model";
import { updateTeacher } from "@/app/server/teachers/updateTeacher";
import { Schedule } from "@/app/models/schedule.model";

export const ScheduleForm = ({ id }: ScheduleFormM): ReactElement => {
        
  const utcDate = new Date(Date.now());  
  const today = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000)

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data:Schedule = Object.fromEntries(formData);    
    const {k,out} = data;
    await updateTeacher({in:today,out}, id);        
  };

  return (
    <form onSubmit={handleForm}>      

      <div className="form-group">
        <label htmlFor="out">Hora de salida</label>
        <input
          type="datetime-local"
          className="form-control"
          id="out"
          name="out"
          required
          placeholder="Ingrese hora de salida"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
