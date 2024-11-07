import { Suspense, type ReactElement } from "react";
import { ScheduleTable } from "@/app/components/TeachersScheduleTable/TeacherScheduleTable";
import { getTeacher } from "@/app/datasources/api/getTeacher";
import { TableSkeleton } from "@/app/components/Skeletons/TableSkeleton";

import styles from "./page.module.css";

export default async function TeacherSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const id = (await params).id;
  const teacher = await getTeacher(id);
  return (
    <div className={styles.teacherSchedule}>
      <h4>
        User: {teacher?.name} id: {id}
      </h4>      
      <Suspense fallback={<TableSkeleton/>}>
        <ScheduleTable schedules={teacher?.schedules} />
      </Suspense>
      {teacher?.schedules?.length === 0 && <div>No tienes registros</div>}
    </div>
  );
}
