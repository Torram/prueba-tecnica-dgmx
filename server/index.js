const express = require("express");
const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
const cors = require("cors");

const app = express();
const PORT = 7001;
const sequelize = new Sequelize("Raymundo", "master", "dgmxt3st1!", {
  host: "dgmx-assesment-tasks-fs.cba8xycvnsrk.us-west-2.rds.amazonaws.com",
  dialect: "mysql",
});

sequelize.define("");

app.use(cors());
app.use(express.json());

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
    },

    isCompleted: {
      type: DataTypes.BOOLEAN,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

app.post("/tasks", async (req, res) => {
  const { title } = req.body;

  try {
    if (title !== undefined) {
      await Task.create({
        title: title,
        isActive: true,
        isCompleted: false,
      });

      const list = await Task.findAll();
      res.status(200).json({ list });
    } else {
      console.log("No encuentra la tarea");
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const list = await Task.findAll();
    res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error recuperando tareas" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const { title, isActive, isCompleted } = req.body;
  let task = {};
  try {
    if (title !== undefined) {
      task = { ...task, title: title };
    }
    if (isActive !== undefined) {
      task = { ...task, isActive: isActive };
    }
    if (isCompleted !== undefined) {
      task = { ...task, isCompleted: isCompleted };
    }

    await Task.update(task, { where: { id: id } });

    const list = await Task.findAll();
    res.status(200).json({ list });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, async () => {
  console.log("Servidor iniciado");
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida");
  } catch (error) {
    console.error("No se pudo conectar", error);
  }
});
