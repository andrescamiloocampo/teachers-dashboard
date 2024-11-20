"use client";
import { Schedule } from "@/app/models/schedule.model";
import { type ReactElement } from "react";
import styles from './TeacherSchedule.module.css';

interface ScheduleTableM {
  schedules?: Schedule[];
}

export const ScheduleTable = ({
  schedules = [],
}: ScheduleTableM): ReactElement => {
  const time = new Date(Date.now());

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">In</th>
          <th scope="col">Out</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {schedules
          .filter((schedule) => schedule.in !== null && schedule.out !== null)
          .map((schedule, index) => {
            const difference =
              time.getHours() -
              Number(schedule.out.toString().split("T")[1].split(":")[0]);
            const isPositive = difference >= 0;

            return (
              <tr key={index}>
                <td>{`${schedule.in}`}</td>
                <td>{`${schedule.out}`}</td>
                <td>
                  <span className={`${styles.tag} ${isPositive ? styles.positive : styles.negative}`}>
                    {isPositive ? "Jornada completada" : "Jornada en progreso"}
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
