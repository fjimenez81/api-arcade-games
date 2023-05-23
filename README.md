# api-arcade-games
<h2>Api arcade games<h2>
<h3>How to use:</h3><br>
<ul>
  <li>docker-compose up -d</li>
</ul>
<h3>Api users routes:</h3><br>
<ul>
  <li>Register user: &nbsp; http://localhost:5000/api/user/signup</li>
  <li>Login user: &nbsp; http://localhost:5000/api/user/login</li>
  <li>Update user: &nbsp; http://localhost:5000/api/user/updateuser</li>
  <li>Get user(only admin user): &nbsp; http://localhost:5000/api/user/getuser/:id</li>
  <li>Get all user(only admin user): &nbsp; http://localhost:5000/api/user/getusers</li>
  <li>Delete user(only admin user): &nbsp; http://localhost:5000/api/user/deleteuser/:id</li>
</ul>
<h3>Add admin user:</h3><br>
<ul>
  <li>admin@arcade.com</li>
</ul>
<h3>Api games routes(only authenticated users):</h3><br>
<ul>
  <li>Create game: &nbsp; http://localhost:5000/api/game/create</li>
  <li>Update game: &nbsp; http://localhost:5000/api/game/update/:id</li>
  <li>Get game: &nbsp; http://localhost:5000/api/game/showgame/:id</li>
  <li>Get all games: &nbsp; http://localhost:5000/api/game/showgames</li>
  <li>Delete game: &nbsp; http://localhost:5000/api/game/removegame/:id</li>
  <li>Delete all games: &nbsp; http://localhost:5000/api/game/removegames</li>
</ul>
<h3>How to use with postman:</h3><br>
<ul>
  <li>Set header authentication: Bearer + token</li>
</ul>
<h3>TO DO: improving...</h3><br>
