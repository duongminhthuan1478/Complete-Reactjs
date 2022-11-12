import React, { useEffect, useState } from "react";

import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import useHttp from "./hooks/use-http";

function App() {
  const url = "https://react-http-7aa09-default-rtdb.firebaseio.com/tasks.json";
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformData = (res) => {
      const tasks = [];
      for (const taskKey in res) {
        tasks.push({ id: taskKey, text: res[taskKey].text });
      }
      setTasks(tasks);
    };

    fetchTasks({ url }, transformData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
