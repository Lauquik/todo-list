import { useEffect, useState } from "react";

import Tableu from "./tableu";
import Form from "./Form";
import Cookies from "js-cookie";
import axios from "axios";

export default function Index() {
  const [beingedit, setbeingedit] = useState(-1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [gandu, setUser] = useState("");
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    const user = Cookies.get("user");
    const bhosdi = JSON.parse(user).email;
    if (user) {
      setUser(bhosdi);
    }
    async function chutmari(bhosdi) {
      await axios
        .post("/gettodos", {
          email: bhosdi,
        })
        .then((response) => {
          setTodo(response.data.arr);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    chutmari(bhosdi);
  }, []);

  function handleSubmit(e) {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    const date =
      day +
      "-" +
      month +
      "-" +
      year +
      "/" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    const maal = { title: title, desc: desc, date: date, comleted: false };
    e.preventDefault();
    setTodo((currtodos) => {
      return [...currtodos, maal];
    });
    setTitle("");
    setDesc("");
  }

  function edit(index) {
    setbeingedit(index);
    setTitle(todos[index].title);
    setDesc(todos[index].desc);
  }

  function handleEdit(e) {
    e.preventDefault();
    todos[beingedit].title = title;
    todos[beingedit].desc = desc;
    setbeingedit(-1);
    setDesc("");
    setTitle("");
  }

  function handleCancel(e) {
    e.preventDefault();
    setbeingedit(-1);
    setDesc("");
    setTitle("");
  }

  function handleDelete(indextodelete) {
    setTodo((currtodo) => {
      return currtodo.filter((_, index) => index !== indextodelete);
    });
  }

  function handleToggle(index, completed) {
    setTodo((currtodo) => {
      return currtodo.map((todo, i) => {
        if (i == index) {
          todo.comleted = completed;
        }
        return todo;
      });
    });
  }

  async function handleSave() {
    await axios
      .post("/savetodos", {
        email: gandu,
        todos: todos,
      })
      .then((res) => {
        if (res.status == 200) {
          alert("saved succesfully");
        } else {
          alert("gand marao");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="h-screen bg-zinc-900 flex flex-col items-center justify-center">
      <h1 className="p-3 h1 text-white">Todo List</h1>
      <div className="flex flex-col items-center text-white">
        <h1 className="pl-5">User: {gandu}</h1>
        <button onClick={handleSave} className="btn btn-primary mt-4">
          Save
        </button>
      </div>

      <Form
        title={title}
        desc={desc}
        setTitle={setTitle}
        setDesc={setDesc}
        beingedit={beingedit}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />

      <div className="mt-4">
        {todos.length == 0 ? (
          <p className="text-white text-center text-2xl italic">
            No todo work to show
          </p>
        ) : (
          <Tableu
            todos={todos}
            edit={edit}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        )}
      </div>
    </div>
  );
}
