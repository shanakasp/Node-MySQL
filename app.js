import express from "express";
import { getNotes } from "./database.js";
const app = express();

app.use(express.json);
app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    res.send(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Something went wrong while fetching notes.");
  }
});

// app.get("/notes/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const note = await getNote(id);
//     res.send(note);
//   } catch (error) {
//     console.error("Error fetching notes:", error);
//     res.status(500).send("Something went wrong while fetching notes.");
//   }
// });

// app.post("/note", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const newNote = await createNote(title, content);
//     res.status(201).send(newNote);
//   } catch (error) {
//     console.error("Error creating note:", error);
//     res.status(500).send("Something went wrong while creating note.");
//   }
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
