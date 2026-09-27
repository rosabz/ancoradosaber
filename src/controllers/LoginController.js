const LoginService = require("../services/LoginService");

class LoginController {
  constructor() {
    this.service = new LoginService();
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const resultado = await this.service.login(email, senha);

      res.status(200).json(resultado);
    } catch (error) {
      res.status(401).json({
        erro: error.message,
      });
    }
  }
}

module.exports = LoginController;