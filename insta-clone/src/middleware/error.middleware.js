let errorMiddleware  = (err , req , res , next)=>{

    console.log("Status Code:-  " , err.statusCode);

    console.log("Error in middleware :- ", err.message);

    res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });


}

module.exports = errorMiddleware

