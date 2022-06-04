const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 5001;

//process.env

//middleware
app.use(cors());
app.use(express.json()); //req.body


if(process.env.NODE_ENV === "production"){
  //serve static content
  app.use(express.static('client/build'));
}

//ROUTES//

app.use("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query("select * from users where username=$1", [
      username,
    ]);
    if (
      result != undefined &&
      result.rows != undefined &&
      result.rows[0] != undefined
    ) {
      let isValidPassword = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (isValidPassword) {
        const id = result.rows[0].user_id;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: 300,
        });
        // req.session.user = result;
        res.send({
          auth: true,
          token: token,
          result: result.rows[0],
        });
      } else {
        res.send({
          auth: false,
        });
      }
    } else {
      res.send({
        auth: false,
      });
    }
  } catch (err) {
    console.log("some error " + err);
    res.send({
      auth: false,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("select * from users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/students", async (req, res) => {
  try {
    const allStudents = await pool.query(
      "select * from users where lower(role)='student'"
    );
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.get("/users/professors", async (req, res) => {
  try {
    const allStudents = await pool.query(
      "select * from users where lower(role)='professor'"
    );
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects", async (req, res) => {
  try {
    const allProjects = await pool.query("select * from projects");
    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query(
      "select * from projects where project_id = $1",
      [id]
    );

    res.json(project.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/groups", async (req, res) => {
  try {
    const allGroups = await pool.query("select * from groupprojectmapping");
    res.json(allGroups.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await pool.query(
      "select * from groupprojectmapping where group_id = $1",
      [id]
    );

    res.json(group.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/groups/:id/grade", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await pool.query(
      "select grade from groupprojectmapping where group_id = $1",
      [id]
    );

    res.json(group.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/groups/professor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await pool.query(
      "select * from groupprojectmapping where project_id in (select project_id from projects where professor_id = $1)",
      [id]
    );

    res.json(group.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/stories", async (req, res) => {
  try {
    const authResponse = await fetch("http://localhost:5001/isUserAuth", {
      headers: {
        "x-access-token": req.headers["x-access-token"],
      },
    });
    const authResult = await authResponse.json();
    if (!authResult.auth) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    const allStories = await pool.query("select * from stories");
    res.json(allStories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/stories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const story = await pool.query(
      "select s.story_id, p.project_id, u.user_id as developer_id, u.username as developer_name, story_name, story_description, story_points, status  from stories s, projectstorymapping p, users u where s.story_id = $1 and p.story_id = s.story_id and u.user_id = p.developer_id;",
      [id]
    );
    res.json(story.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/:id/stories", async (req, res) => {
  try {
    const { id } = req.params;
    const stories = await pool.query(
      "select * from stories where story_id in (select story_id from projectstorymapping where developer_id = $1)",
      [id]
    );

    res.json(stories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects/:id/stories", async (req, res) => {
  try {
    const { id } = req.params;
    const stories = await pool.query(
      "select stories.story_id,story_name,story_description,story_points,status,username AS developer, user_id as developer_id from stories join projectstorymapping on stories.story_id = projectstorymapping.story_id join users on users.user_id = projectstorymapping.developer_id where project_id = $1 order by story_id",
      [id]
    );
    res.json(stories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/projects", async (req, res) => {
  try {
    const {
      project_id,
      project_name,
      project_description,
      github_url,
      video_url,
      funding_url,
      project_status,
      domain,
      professor_id,
    } = await req.body;
    const newProject = await pool.query(
      "INSERT INTO projects (project_id, project_name,project_description,github_url,video_url,funding_url,status,domain,professor_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8::text,$9) RETURNING *",
      [
        project_id,
        project_name,
        project_description,
        github_url,
        video_url,
        funding_url,
        project_status,
        domain,
        professor_id,
      ]
    );

    res.json(newProject.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      first_name,
      last_name,
      phone,
      role,
      department,
    } = await req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username,password,email,first_name,last_name,phone,role,department) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        username,
        hashedPassword,
        email,
        first_name,
        last_name,
        phone,
        role,
        department,
      ]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/groupprojectmapping", async (req, res) => {
  try {
    const { group_id, project_id, grade } = await req.body;

    const newStory = await pool.query(
      "INSERT INTO groupprojectmapping (group_id,project_id,grade) VALUES($1,$2,$3) RETURNING *",
      [group_id, project_id, grade]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/stories", async (req, res) => {
  try {
    const {
      story_id,
      story_name,
      story_description,
      story_points,
      status,
      project_id,
      developer_id,
    } = await req.body;

    const newStory = await pool.query(
      "INSERT INTO stories (story_name,story_description,story_points,status) VALUES($1,$2,$3,$4) RETURNING *",
      [story_name, story_description, story_points, status]
    );

    const newProjectStoryMapping = await pool.query(
      "INSERT INTO projectstorymapping (project_id, story_id, developer_id) VALUES($1,$2,$3) RETURNING *",
      [project_id, newStory.rows[0].story_id, developer_id]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/groupprojectmapping", async (req, res) => {
  try {
    const { project_id, grade } = await req.body;

    const newStory = await pool.query(
      "INSERT INTO groupprojectmapping (project_id,grade) VALUES($1,$2) RETURNING *",
      [project_id, grade]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/studentgroupmapping", async (req, res) => {
  try {
    const { user_id, group_id, is_user_owner, is_active_group } =
      await req.body;

    const newStory = await pool.query(
      "INSERT INTO studentgroupmapping (user_id,group_id,is_user_owner,is_active_group) VALUES($1,$2,$3,$4) RETURNING *",
      [user_id, group_id, is_user_owner, is_active_group]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/projectstorymapping", async (req, res) => {
  try {
    const { project_id, story_id, developer_id } = await req.body;

    const newStory = await pool.query(
      "INSERT INTO projectstorymapping (project_id,story_id,developer_id) VALUES($1,$2,$3) RETURNING *",
      [project_id, story_id, developer_id]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/stories", async (req, res) => {
  try {
    const { story_id, story_name, story_description, story_points, status } =
      await req.body;

    const newStory = await pool.query(
      "INSERT INTO stories (story_id,story_name,story_description,story_points,status) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [story_id, story_name, story_description, story_points, status]
    );

    res.json(newStory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/stories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { story_name, story_description, story_points, status } =
      await req.body;
    const updateStory = await pool.query(
      "UPDATE stories SET story_name = $1, story_description = $2, story_points = $3, status = $4 WHERE story_id = $5",
      [story_name, story_description, story_points, status, id]
    );

    res.json("Story was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/stories/:id/developer", async (req, res) => {
  try {
    const { id } = req.params;
    const { developer_id, project_id } = await req.body;
    const updateStory = await pool.query(
      "UPDATE projectstorymapping SET developer_id = $1 WHERE story_id = $2 and project_id = $3",
      [developer_id, id, project_id]
    );
    res.json(updateStory.rowCount + " rows updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_name,
      project_description,
      github_url,
      video_url,
      funding_url,
      status,
      domain,
      professor_id,
    } = await req.body;
    const updateStory = await pool.query(
      "UPDATE projects SET project_name = $1, project_description = $2, github_url = $3, video_url = $4, funding_url = $5, status = $6, domain = $7, professor_id = $8 WHERE project_id = $9",
      [
        project_name,
        project_description,
        github_url,
        video_url,
        funding_url,
        status,
        domain,
        professor_id,
        id,
      ]
    );

    res.json("Project was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/developer/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const developer = await pool.query(
      "select user_id as developer_id, username as developer_name from users where username = $1",
      [name]
    );
    res.json(developer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects/:id/developers", async (req, res) => {
  try {
    const { id } = req.params;
    const developer = await pool.query(
      "select username as developer_name from users u where user_id  in (select user_id  from studentgroupmapping s where group_id in (select group_id from groupprojectmapping g where project_id = $1))",
      [id]
    );
    res.json(developer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//TEST JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({ auth: false, message: "No Token" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.send({ auth: false, message: "Invalid token" });
      } else {
        req.userId = decoded.id;
        res.send({ auth: true, message: "Yo Auth" });
        console.log(decoded.id);
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Yo Auth");
});

app.get("/groups/members/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const users = await pool.query(
            "select username as developer_name from users u where user_id  in (select user_id from studentgroupmapping s where group_id = $1)",
            [id]
        );
        res.json(users.rows);
    } catch(err) {
        console.error(err.message);
    }
});

app.get("*", (req, res) => {
  const index = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(index);
})

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
