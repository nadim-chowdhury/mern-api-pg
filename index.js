const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((u) => `<li>${u.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.use(express.urlencoded({ extended: false }));

app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    return res.json(user);
  })
  .post((req, res) => {
    return res.json({ status: "pending" });
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.listen(PORT, () => console.log("Server Started at " + PORT));
