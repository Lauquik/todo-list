import { useState } from "react";

export default function Form({
  title,
  desc,
  beingedit,
  handleEdit,
  handleCancel,
  handleSubmit,
  setTitle,
  setDesc,
}) {
  return (
    <form className="w-1/4 p-4">
      <label
        htmlFor="title"
        className="block font-medium font-sans leading-6 text-white text-base"
      >
        Title
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 min-w-full">
          <input
            type="text"
            name="title"
            id="title"
            className="block flex-1 border-0 bg-zinc-700 py-1.5 pl-1 text-white text-lg focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Todo Titile"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <label
        htmlFor="title"
        className="mt-4 block font-medium font-sans leading-6 text-white text-base"
      >
        Description
      </label>
      <textarea
        className="min-w-full mt-2 rounded-md py-1.5 pl-1 bg-zinc-700 text-white sm:text-sm sm:leading-6"
        id="exampleFormControlTextarea1"
        placeholder="Dexcription"
        rows="3"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      ></textarea>
      {beingedit != -1 ? (
        <div className="mt-2 space-x-4">
          <button className="btn btn-success" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-2 btn btn-primary bg-blue-700"
          onClick={handleSubmit}
        >
          Add
        </button>
      )}
    </form>
  );
}
