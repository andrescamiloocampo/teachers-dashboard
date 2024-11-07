import type {Schedule} from './schedule.model'

export interface Teacher {
    id: number;
    nit: string;
    name: string;
    lastName: string;
    area: string;
    schedules?: Schedule[];
}