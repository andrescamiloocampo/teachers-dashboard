"use client";
import { Schedule } from "@/app/models/schedule.model";
import { type ReactElement, useState, useEffect } from "react";
import styles from './TeacherSchedule.module.css';

interface ScheduleTableM {
  schedules?: Schedule[];
}

export const ScheduleTable = ({
  schedules = [],
}: ScheduleTableM): ReactElement => {
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    const timeInUnix = Math.floor(Date.now() / 1000);
    setCurrentTime(timeInUnix);
  }, []);

  if (currentTime === null) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">In</th>
          <th scope="col">Out</th>
          <th scope="col">Status</th>
          <th scope="col">Time Remaining</th>
        </tr>
      </thead>
      <tbody>
        {schedules
          .filter((schedule) => schedule.in !== null && schedule.out !== null)
          .map((schedule, index) => {
            const outTimeUnix = new Date(schedule.out).getTime() / 1000;
            const difference = outTimeUnix - currentTime; 
            const isCompleted = difference <= 0; 
            
            const timeRemaining = isCompleted? "Completed" : new Date(difference * 1000).toISOString().substr(11, 8); // HH:mm:ss format

            return (
              <tr key={index}>
                <td>{schedule.in}</td>
                <td>{schedule.out}</td>
                <td>
                  <span className={`${styles.tag} ${isCompleted ? styles.positive : styles.negative}`}>
                    {isCompleted ? "Jornada completada" : "Jornada en progreso"}
                  </span>
                </td>
                <td>{timeRemaining}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
