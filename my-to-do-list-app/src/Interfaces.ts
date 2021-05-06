export interface ITask {
    id: number;
    task: string;
    deadLine: Date;
    status: string;
}
export interface IFetchTaskList {
    tasksList: ITask[];
}