let nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"mk0437271@gmail.com",
        pass:process.env.APP_PASS
    }
})

let sendMailTo = async (to,subject,html)=>{

    let options = {
        from:"mk0437271@gmail.com",
        to,
        subject,
        html
    }

    return await transporter.sendMail(options)
}

module.exports =sendMailTo