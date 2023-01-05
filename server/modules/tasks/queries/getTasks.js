import { TasksCollection } from "../../../../imports/api/TasksCollection";

export default async function getTasks(filter) {
	return TasksCollection.find(filter, {
		sort: { createdAt: 1 },
	}).fetch();
}
