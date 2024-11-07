"use client";
import { Schedule } from "@/app/models/schedule.model";
import { type ReactElement } from "react";
// import styles from './TeacherSchedule.module.css';

interface ScheduleTableM {
  schedules?: Schedule[];
}

export const ScheduleTable = ({
  schedules = [],
}: ScheduleTableM): ReactElement => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">In</th>
          <th scope="col">Out</th>
        </tr>
      </thead>
      <tbody>        
          {schedules
            .filter((schedule) => schedule.in !== null && schedule.out !== null)
            .map((schedule, index) => (
              <tr key={index}>
                <td>{`${schedule.in}`}</td>
                <td>{`${schedule.out}`}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
