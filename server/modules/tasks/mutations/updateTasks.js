import { TasksCollection } from "../../../../imports/api/TasksCollection";

export default async function updateTasks({ _id, isChecked }) {
	return TasksCollection.update(_id, {
		$set: {
			isChecked: !!isChecked,
		},
	});
}
