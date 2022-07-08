const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");
// const index = require("../index.html");


const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const CLIENT_ID = '463084413869-tb54g5cvf5c4cucb2hd0n77vdv3o8kkc.apps.googleusercontent.com';
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04wFwvdBTUqksCgYIARAAGAQSNwF-L9IrXu9uzIybSmEwpE243UCVMvPiDqU0a_lcLYSU5LXIF3fFwqoKZH9kttYl2t7_ig1BYXI";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuthPass = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuthPass.setCredentials({ refresh_token: REFRESH_TOKEN });

const getToken = crypto.randomBytes(32).toString("hex");
const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

const verifiedEmail = async (email, user) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

        // const getToken = crypto.randomBytes(32).toString("hex");
        // const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "pidginapp1@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: createToken.token,
            },
        });

        const mailOptions = {
            from: "Pidgin ✉️🍾 <pidginapp1@gmail.com>",
            to: email,
            subject: "Account Verification",
            html: ` <body style=" width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;">
<div style="  width: 400px;
            height: 500px;
            border: 1px solid lightgray;">
    <div  style="  height: 70px;
            border-bottom: 1px solid lightgray;
             display: flex;
  align-items: flex-end;
  margin-bottom: 20px;">
        <!-- <img src="./WhatsApp Image 2022-07-04 at 1.31.10 PM.jpeg"/> -->
        <span style=" display: flex;
    align-items: flex-end;
    font-size: 20px;
    font-weight: bold;
    color: black;>Pidgin</span>
    </div>
<div style="  display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;">
    <span>Email Address Verification</span>
    <br />
    <br />
    <pan>
        To activate this account, please click the link below.
    </pan>
    <br />
    <br />
    <button style="  width: 90px;
            height: 40px;
            border: 0;
            outline: none;
            background-color: rgb(134, 23, 23);
            color: white;
            border-radius: 5px;
            font-weight: 700;">
        <a href="https://pidgin-app.herokuapp.com/auth/${user}/${token}" style="text-decoration: none;
            color: rgb(134, 23, 23);
            font-weight: 700;">Verify</a>
    </button>
    <br />
    <br />
    <span style="   color: gray;
            font-weight: 800;
            font-size: 20px;
            /* width: 500px; */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;">
         This link will expire after 20 mins. To request another verification
link, please <a
            href="https://pidgin-app.herokuapp.com/auth/${user}/${token}"
            >log in</a>
        <br />
    </span>
</div>

</div>

</body>`,
        };

        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};

const signInverifiedEmail = async (email, user) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

        const getToken = crypto.randomBytes(32).toString("hex");
        const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "pidginapp1@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: createToken.token,
            },
        });

        const mailOptions = {
            from: "Pidgin ✉️🍾 <pidginapp1@gmail.com>",
            to: email,
            subject: "Account Verification",
            html: ` <h3>
            This is to verify your account, please click the <a
            href="https://pidgin-app.herokuapp.com/auth/${user}/${token}"
            >Link</a> to continue, this link expires in 20mins
        </h3>`,
        };

        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};
const passverifiedEmail = async (email, user) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

        const getToken = crypto.randomBytes(32).toString("hex");
        const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "pidginapp1@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: createToken.token,
            },
        });

        const mailOptions = {
            from: "Pidgin ✉️🍾 <pidginapp1@gmail.com>",
            to: email,
            subject: "Account Verification",
            html: ` <h3>
            This is to verify your account, please click the <a
            href="https://pidgin-app.herokuapp.com/pidgin/user/reset/${user}/${token}"
            >Link</a> to continue, this link expires in 20mins
        </h3>`,
        };

        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = { verifiedEmail, signInverifiedEmail, token, passverifiedEmail }; 
