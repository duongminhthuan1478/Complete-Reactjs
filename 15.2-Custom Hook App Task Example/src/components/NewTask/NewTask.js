import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const url = "https://react-http-7aa09-default-rtdb.firebaseio.com/tasks.json";
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, res) => {
    console.log("createTask", taskText, res);
    const generatedId = res.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url,
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      // khi sử dụng bind, tham số res sẽ được tự động thêm vào tham số res khi useHttp đã sử dụng applyDataFn(data); vì vậy res sẽ tự động có data
      createTask.bind(this, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
