import { type ReactElement } from "react";
import styles from './TableSkeleton.module.css';

export const TableSkeleton = ():ReactElement =>{
    return <div className={styles.skeleton}/>        
}