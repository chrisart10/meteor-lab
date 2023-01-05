import { TasksCollection } from "../../../../imports/api/TasksCollection";

export default async function deleteTasks({ _id }) {
	return TasksCollection.remove(_id);
}
