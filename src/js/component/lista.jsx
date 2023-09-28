import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faIconName } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Modal } from "./modal.jsx";
import { ModalEditar } from "./modalEditar.jsx";
import { ModalEliminar } from "./modalEliminar.jsx";
import { ModalEliminarTodas } from "./modalEliminarTodas.jsx";
import { ModalEditarTodas } from "./modalEditarTodas.jsx";
import { ModalAgregarTodas } from "./modalAgregarTodas.jsx";
import { ModalAgregar } from "./modalAgregar.jsx";
import { ModalEliminarUsuario } from "./modalEliminarUsuario.jsx";
import { ModalEditarUsuario } from "./modalEditarUsuario.jsx";
import { ModalAgregarUsuario } from "./modalAgregarUsuario.jsx";
import { ModalAgregarUsuarioTodas } from "./modalAgregarUsuarioTodas.jsx";
import { ModalEditarUsuarioTodas } from "./modalEditarUsuarioTodas.jsx";
import { ModalEliminarUsuarioTodas } from "./modalEliminarUsuarioTodas.jsx";
import { ModalEliminarTodasTodas } from "./modalEliminarTodasTodas.jsx";
import { ModalEditarTodasTodas } from "./modalEditarTodasTodas.jsx";
import { ModalAgregarTodasTodas } from "./modalAgregarTodasTodas.jsx";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Almacenamiento temporal de las tareas (puedes reemplazar esto con una base de datos)
let tasks = [];

// 1. Get list of todo's for a particular user
app.get(
  "https://playground.4geeks.com/apis/fake/todos/user/Minusuke",
  (req, res) => {
    const username = req.params.username;
    const userTasks = tasks.filter((task) => task.username === username);
    res.json(userTasks);
  }
);

// 2. Create a new todo list of a particular user
app.post(
  "https://playground.4geeks.com/apis/fake/todos/user/Minusuke",
  (req, res) => {
    const username = req.params.username;
    const newUserTasks = req.body;

    // Guardar las tareas en el almacenamiento temporal
    tasks.push({ username, tasks: newUserTasks });

    res.json({ result: "ok" });
  }
);

// 3. Update the entire list of todo's of a particular user
app.put(
  "https://playground.4geeks.com/apis/fake/todos/user/Minusuke",
  (req, res) => {
    const username = req.params.username;
    const updatedTasks = req.body;

    // Actualizar las tareas en el almacenamiento temporal
    tasks = tasks.map((task) =>
      task.username === username ? { username, tasks: updatedTasks } : task
    );

    res.json({
      result: `A list with ${updatedTasks.length} todos was successfully saved`,
    });
  }
);

// 4. Delete a user and all of their todo's
app.delete(
  "https://playground.4geeks.com/apis/fake/todos/user/Minusuke",
  (req, res) => {
    const username = req.params.username;

    // Eliminar al usuario y sus tareas del almacenamiento temporal
    tasks = tasks.filter((task) => task.username !== username);

    res.json({ result: "ok" });
  }
);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
export { Lista };
