import { TasksCollection } from "../../../../imports/api/TasksCollection";

export default async function getNumberOfPendingTasks(pendingOnlyFilter) {
	return TasksCollection.find(pendingOnlyFilter).count();
}
