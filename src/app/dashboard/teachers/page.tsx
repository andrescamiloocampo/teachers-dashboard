import { type ReactElement } from "react";
import styles from "./page.module.css";
import { TeachersTable } from "@/app/components/TeachersTable/TeachersTable";
import { getTeachers } from "@/app/datasources/api/getTeachers";

export default async function teachersTablePage(): Promise<ReactElement> {
  const teachers = await getTeachers();
  return (
    <div className={styles.mainDashboard}>
      <TeachersTable teachers={teachers} />
    </div>
  );
}
