const AWS = require("aws-sdk");
const ses = new AWS.SES({
  apiVersion: "2010-12-01",
  region: "eu-west-2",
});
const mimemessage = require('mimemessage');

const sendTextEmail = async (to,subject,message) => {
  try {
      let params = {
      Destination: {
        ToAddresses: [
          to
        ],
      },
      Message: {
        Body: {
          // Html: {
          //  Charset: "UTF-8",
          //  Data: message
          // },
          Text: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: `ankurgupta325@gmail.com`,
      ReplyToAddresses: [
        `ankurgupta325@gmail.com`
      ],
    };

    let emailResponse = await ses.sendEmail(params).promise();
    console.log(`Email Response ${emailResponse}`);
    if (emailResponse) {
      console.log(`Email send successfully to ${to} with message ${message} and subject ${subject}`);
    } else {
      console.log(`Email sending failed to ${to} with message ${message} and subject ${subject}`);
      return { status: "failed" };
    }
    return {
      status: "success"
    };
  } catch (error) {
    console.log(`caught error  ${error}`);
    return { status: "failed" };
  }
};

const sendRawSESEmailWithPDFAttachment = async (to,subject,message,attachment) => {
  try {
    
    // Mime type email 
   let mailContent = mimemessage.factory({contentType: 'multipart/mixed',body: []});
       mailContent.header('From', `${process.env.EMAIL_FROM_ADDR}`);
       mailContent.header('To',to);
       mailContent.header('Subject', subject);
 
       let alternateEntity = mimemessage.factory({
         contentType: 'multipart/alternate',
         body: []
     });
     const htmlEntity = mimemessage.factory({
       contentType: 'text/html;charset=utf-8',
       body:  "   <html>  "  + 
              "   <head></head>  "  + 
              "   <body>  "  + 
              "   <h1> " + message +"</h1>  " + 
              "   </body>  "  + 
              "  </html>  " 
     });
    const plainEntity = mimemessage.factory({
       body: message
    });
    alternateEntity.body.push(htmlEntity);
   //  alternateEntity.body.push(plainEntity);
    mailContent.body.push(alternateEntity);
 
 
    let attachmentEntity = mimemessage.factory({
        contentType: 'application/pdf',
        contentTransferEncoding: 'base64',
        body: attachment,
      });
    console.log("Adding pdf as attachemnt")
    attachmentEntity.header('Content-Disposition', 'attachment; filename=contract.pdf');

    
    
    mailContent.body.push(attachmentEntity);
   
     const emailResponse = await ses.sendRawEmail({
       RawMessage: { Data: mailContent.toString() }
   }).promise();


   console.log(` Mail Content ${mailContent.toString()}`)
     console.log(`Email Response ${emailResponse}`);

     return {status: "success", message: emailResponse};
  } catch (error) {
    console.log(`caught error  ${error}`);
    return { status: "failed" };
  }
};
module.exports = {
  sendTextEmail,
  sendRawSESEmailWithPDFAttachment
};