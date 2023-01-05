import { TasksCollection } from "../../../../imports/api/TasksCollection";

export default async function insertTask({ text, user }) {
	return TasksCollection.insert({
		userId: user._id,
		text,
		createdAt: new Date(),
	});
}
