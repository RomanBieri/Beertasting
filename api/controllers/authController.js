// backend/beertasting-app/backend/controllers/authController.js

const User = require("../models/user.model.js");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Benutzername und Passwort sind erforderlich." });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Dieser Benutzername ist bereits vergeben." });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Benutzer erfolgreich registriert." });
  } catch (error) {
    
    console.error("SERVER-ABSTURZ BEI REGISTRIERUNG:", error);

    res.status(500).json({ message: "Serverfehler bei der Registrierung." });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Benutzername und Passwort sind erforderlich." });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Benutzername oder Passwort ist falsch." });
    }
    if (password !== user.password) {
      return res
        .status(400)
        .json({ message: "Benutzername oder Passwort ist falsch." });
    }
    res.status(200).json({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
  
    console.error("SERVER-ABSTURZ BEIM LOGIN:", error);
    res.status(500).json({ message: "Serverfehler beim Login." });
  }
};
