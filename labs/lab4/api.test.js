import axios from "axios";

describe("API", () => {
  let token;
  let noteId;

  beforeEach(async () => {
    const authResponse = await axios.post(
      "https://practice.expandtesting.com/notes/api/users/login",
      {
        email: "tajanmisiura@gmail.com",
        password: "OWLOWL123",
      }
    );

    token = authResponse.data.data.token;
  });

  test("should create note correctly", async () => {
    const testNote = {
      title: "Test Note",
      description: "Test Description",
      category: "Personal",
    };

    const createNoteResponse = await axios.post(
      "https://practice.expandtesting.com/notes/api/notes",
      testNote,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    const { id, title, description, category } = createNoteResponse.data.data;

    noteId = id;

    expect(title).toBe(testNote.title);
    expect(description).toBe(testNote.description);
    expect(category).toBe(testNote.category);
  });

  test("should update note's completed status correctly", async () => {
    const updatedNoteResponse = await axios.patch(
      `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      { completed: true },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    expect(updatedNoteResponse.data.data.completed).toBe(true);
  });

  test("should get all notes correctly", async () => {
    const notesResponse = await axios.get(
      `https://practice.expandtesting.com/notes/api/notes`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    const notes = notesResponse.data.data;

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
        }),
      ])
    );
  });

  test("should get note by id correctly", async () => {
    const notesResponse = await axios.get(
      `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    const notes = notesResponse.data.data;

    expect(notes).toEqual(
      expect.objectContaining({
        id: noteId,
        title: expect.any(String),
      })
    );
  });

  test("should delete note by id correctly", async () => {
    const notesResponse = await axios.delete(
      `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    expect(notesResponse.data.status).toBe(200);
  });
});


