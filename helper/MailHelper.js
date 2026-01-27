import nodemailer from 'nodemailer'

const Transporter = nodemailer.createTransport({
    host : "smtp-relay.brevo.com",
    port : 587,
    secure : false,
    auth : {
        user : "870885002@smtp-brevo.com",
        pass : "xsmtpsib-37713545390f084a2c5315abf57df56061df7a47f28221e3e5ce0c6e0b1862a9-7yTEmrQi8m5SsgVc"
    }
})

let SendMail = async(to, from, sub, body)=>{
    try{
        let response = await Transporter.sendMail({
            to : to,
            from : from,
            subject : sub,
            html : body
        })
        console.log("MAIL SEND $$$$$$$$$$$", response.messageId);
    }catch(err){
        console.log("------------", err);
    }
}

export default SendMail;