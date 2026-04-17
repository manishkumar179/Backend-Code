let registerController = async (req, res) => {
  try {

    res.send("register")

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in register",
      error,
    });
  }
};



let loginController = async (req, res) => {
  return res.send("login")
};


module.exports = {
    registerController,
    loginController
}