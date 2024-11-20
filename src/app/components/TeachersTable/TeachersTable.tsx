'use client'
import { type ReactElement } from "react";
import type { Teacher } from "../../models/teacher.model";
import styles from './TeachersTable.module.css';
import { useRouter } from "next/navigation";

interface TableProps {
  teachers?: Teacher[];
}

export const TeachersTable = ({ teachers=[] }: TableProps): ReactElement => {
  const router = useRouter();

  const handleTeacherById = (id: number) => {
    router.push(`/dashboard/teachers/${id}`);
  }

  return (
    <table className="table">      
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NIT</th>
          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">Last In</th>
          <th scope="col">Last Out</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id} className={styles.tableRow} onClick={()=>handleTeacherById(teacher.id)}>
            <td>{teacher.id}</td>
            <td>{teacher.nit}</td>
            <td>{teacher.name}</td>
            <td>{teacher.lastName}</td>            
            <td>{`${teacher.schedules?.at(-1)?.in ?? 'No register'}`}</td>
            <td>{`${teacher.schedules?.at(-1)?.out ?? 'No register'}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
