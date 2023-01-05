import React from "react";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { useTracker } from "meteor/react-meteor-data";

const toggleChecked = ({ _id, isChecked }) => {
	Meteor.call("tasks.update", { _id, isChecked: !isChecked });
};

const deleteTask = ({ _id }) => {
	Meteor.call("tasks.delete", { _id });
};

export const App = () => {
	const [tasks, setTasks] = React.useState([]);
	const [hideCompleted, setHideCompleted] = React.useState(false);
	const [pendingTasksCount, setPendingTasksCount] = React.useState(0);
	const user = useTracker(() => Meteor.user());
	const hideCompletedFilter = { isChecked: { $ne: true } };
	const userFilter = user ? { userId: user._id } : {};
	const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
	React.useEffect(() => {
		Meteor.call(
			"tasks.get",
			hideCompleted ? pendingOnlyFilter : userFilter,
			(err, res) => {
				if (!user) return [];
				if (err) {
					console.log(err);
				} else {
					setTasks(res);
				}
			}
		);
		Meteor.call(
			"tasks.getNumberOfPendingTasks",
			pendingOnlyFilter,
			(err, res) => {
				if (!user) {
					return 0;
				}
				if (err) {
					console.log(err);
				} else {
					setPendingTasksCount(res);
				}
			}
		);
	}, []);

	const pendingTasksTitle = `${
		pendingTasksCount ? ` (${pendingTasksCount})` : ""
	}`;
	const logout = () => Meteor.logout();

	return (
		<div className="app">
			<header>
				<div className="app-bar">
					<div className="app-header">
						<h1>
							📝️ To Do List
							{pendingTasksTitle}
						</h1>
					</div>
				</div>
			</header>

			<div className="main">
				{user ? (
					<>
						<div className="user" onClick={logout}>
							{user.username} 🚪
						</div>
						<TaskForm user={user} />

						<div className="filter">
							<button
								onClick={() => setHideCompleted(!hideCompleted)}
							>
								{hideCompleted ? "Show All" : "Hide Completed"}
							</button>
						</div>

						<ul className="tasks">
							{tasks.map((task) => (
								<Task
									key={task._id}
									task={task}
									onCheckboxClick={toggleChecked}
									onDeleteClick={deleteTask}
								/>
							))}
						</ul>
					</>
				) : (
					<LoginForm />
				)}
			</div>
		</div>
	);
};
