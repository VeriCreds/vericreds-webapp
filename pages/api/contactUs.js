import axios from "axios";

const verifyRecaptcha = async (token) => {

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`

    return axios({
        url: verificationUrl,
        params: {
            secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
            response: token,
        },
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
};

export default async function handler(req, res) {

    try {
        const gReCaptchaToken = req.body.gReCaptchaToken;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;

        const response = await verifyRecaptcha(gReCaptchaToken);

        if (response.data.success && response.data.score > 0.5) {
            await axios.post("https://getform.io/f/ad80d13a-bbcc-4ad1-b6b1-f7216851a9f8",
              {
                  email: email,
                  subject: subject,
                  message: message
              })
              .then(res => console.log(res))
              .catch(error => console.log(error));

            return res.json({
                status: "success",
                message: "ReCaptcha authentication successful",
                response: response.data
            })
        } else {
            return res.json({
                status: "error",
                message: "ReCaptcha went wrong, please try again",
                // response: response.data
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: "Something went wrong, please try again",
            error: error.message,
        });
    }
};
