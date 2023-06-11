export default function Tableu({ todos, edit, handleDelete, handleToggle }) {
  return (
    <table className="table table-striped-columns table-dark">
      <thead>
        <tr>
          <th scope="col" className="font-bold text-2xl">
            #
          </th>
          <th scope="col" className="font-bold text-2xl text-center">
            Mark Done
          </th>
          <th scope="col" className="font-bold text-2xl text-center">
            Title
          </th>
          <th scope="col" className="font-bold text-2xl text-center">
            Description
          </th>
          <th scope="col" className="font-bold text-2xl text-center">
            Added At
          </th>
          <th scope="col" className="font-bold text-2xl text-center">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index} className={todo.comleted ? "table-secondary" : ""}>
            <th scope="row" className="">
              {index + 1}
            </th>
            <td className="text-center align-middle">
              <input
                className="form-check-input text-2xl"
                type="checkbox"
                id="flexCheckChecked"
                checked={todo.completed}
                onChange={(e) => handleToggle(index, e.target.checked)}
              />
            </td>
            <td className="text-center">{todo.title}</td>
            <td className="text-center">{todo.desc}</td>
            <td className="text-center">{todo.date}</td>
            <td className="text-center align-middle">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-success mx-2"
                  onClick={() => edit(index)}
                >
                  edit
                </button>
                <button
                  className="btn btn-outline-danger mx-2"
                  onClick={() => handleDelete(index)}
                >
                  delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
