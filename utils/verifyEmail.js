const sendEmail = require('../misc/mailer');

const verifyUserEmail = async (req, username, email, secretToken) => {
    const html = `
        Hello ${username},
        <br/>
        <br/>

        Thank you for registering an account with us at Group3WAAWMessager.com
        <br/><br/>
        Please click the link below or copy to any browser to verify your accout:
        <br/>
        <a href="http://${req.headers.host}/auth/verify-token/${secretToken}">
                    ${secretToken}
        </a>
        
        <br/><br/>
        Kind regards,
        <br/><br/>
        <strong>Team WAAWMessager.</stong>
    `;

    await sendEmail(
        '',
        email,
        "Please verify account",
        html
    );
}


module.exports = verifyUserEmail;