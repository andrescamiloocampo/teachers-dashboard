'use client'
import { type ReactElement, useState } from "react";
import type { Teacher } from "../../models/teacher.model";
import styles from './TeachersTable.module.css';
import { useRouter } from "next/navigation";

interface TableProps {
  teachers?: Teacher[];
}

export const TeachersTable = ({ teachers = [] }: TableProps): ReactElement => {
  const [searchId, setSearchId] = useState(""); // Estado para la barra de búsqueda
  const router = useRouter();

  const handleTeacherById = (id: number) => {
    router.push(`/dashboard/teachers/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  // Filtrar la lista de profesores por ID
  const filteredTeachers = searchId
    ? teachers.filter((teacher) =>
        teacher.nit.toString().includes(searchId.trim())
      )
    : teachers;

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by ID NUMBER..."
          value={searchId}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      {/* Tabla */}
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
          {filteredTeachers.map((teacher) => (
            <tr
              key={teacher.id}
              className={styles.tableRow}
              onClick={() => handleTeacherById(teacher.id)}
            >
              <td>{teacher.id}</td>
              <td>{teacher.nit}</td>
              <td>{teacher.name}</td>
              <td>{teacher.lastName}</td>
              <td>{`${teacher.schedules?.at(-1)?.in ?? "No register"}`}</td>
              <td>{`${teacher.schedules?.at(-1)?.out ?? "No register"}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
