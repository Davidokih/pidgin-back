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
            html: ` <body>
<div>
    <div>
        <!-- <img src="./WhatsApp Image 2022-07-04 at 1.31.10 PM.jpeg"/> -->
        <h1>Pidgin</h1>
    </div>
<div>
    <h3>Email Address Verification</h3>
    <h4>
        To activate this account, please click the link below.
    </h4>
    <br />
    <h3>
        <a href="https://pidgin-app.herokuapp.com/auth/${user}/${token}">Verify</a>
    </h3>
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
