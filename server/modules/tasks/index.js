import getTasks from "./queries/getTasks";
import getNumberOfPendingTasks from "./queries/getNumberOfPendingTasks";
import insertTask from "./mutations/insertTasks";
import updateTasks from "./mutations/updateTasks";
import deleteTasks from "./mutations/deleteTasks";

Meteor.methods({
	"tasks.get": getTasks,
	"tasks.getNumberOfPendingTasks": getNumberOfPendingTasks,
	"tasks.insert": insertTask,
	"tasks.update": updateTasks,
	"tasks.delete": deleteTasks,
});
