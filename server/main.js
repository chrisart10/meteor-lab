import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
import "./modules/tasks";
import { Accounts } from "meteor/accounts-base";

const insertTask = ({ taskText, user }) => {
	Meteor.call("tasks.insert", { text: taskText, user }, (err, res) =>
		console.log(err, res)
	);
};

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
	const user = Accounts.findUserByUsername(SEED_USERNAME);

	if (!user) {
		Accounts.createUser({
			username: SEED_USERNAME,
			password: SEED_PASSWORD,
		});
	}
	if (TasksCollection.find().count() === 0) {
		console.log("No tasks found in the database. Adding default tasks...");
		[
			"First Task",
			"Second Task",
			"Third Task",
			"Fourth Task",
			"Fifth Task",
			"Sixth Task",
			"Seventh Task",
		].forEach((taskText) => insertTask({ taskText, user }));
		console.log("Added default tasks to the database.");
	}
});
