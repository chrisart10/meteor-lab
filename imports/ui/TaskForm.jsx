import React, { useState } from "react";

export const TaskForm = ({ user }) => {
	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text) return;
		console.log("TaskForm.jsx: handleSubmit: text: " + text);

		Meteor.call("tasks.insert", { text, user }, (err, res) => {
			if (err) {
				console.log(err);
			}
		});
		setText("");
	};

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Type to add new tasks"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button type="submit">Add Task</button>
		</form>
	);
};
