const AuthService = require('../services/auth.service');

class UserController {
  async login(req, res) {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, password } = JSON.parse(body);

      const response = await AuthService.login(username, password);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
  }
}

module.exports = new UserController();
