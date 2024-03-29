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

const verifiedEmail = async (email, user, name) => {
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
        <h1 style="font-size: 30px; font-weight: 500;">Thanks for getting started with our Pidgin App</h1>
    </div>
<div>
    <h3>Hi ${name}</h3>
    <h4>
        We need a little more information to complete your registration, including a confirmation of your email address.
    </h4>
    <br />
    <button style="font-weight: 500; width: 90px; height: 40px; background-color: red;">
        <a href="https://pidgin-app.herokuapp.com/auth/${user}/${token}">Verify</a>
    </button >
<br />
<br />
    <a href="https://pidgin-app.herokuapp.com/auth/${user}/${token}">
    https://pidgin-app.herokuapp.com/auth/${user}/${token}
    </a>
    <br />
    <h4>
            If you have problems, please paste the above URL into your web browser.
    </h4>
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
