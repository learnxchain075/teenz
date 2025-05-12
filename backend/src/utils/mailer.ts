import nodemailer from "nodemailer";
import ejs from "ejs";
import * as aws from "@aws-sdk/client-ses";
import Mail from "nodemailer/lib/mailer";

import { CONFIG } from "../config";
import Logger from "./logger";
import { getErrorMessage, getErrorStack } from "./common_utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendExceptionToSupport = (error: any, subject = "Exception Occurred", extraData: string = "") => {
  if (!CONFIG.IS_DEVELOPMENT) {
    Logger.error(error);
    sendErrorMessageToSupport(getErrorStack(error), subject, extraData);
  } else {
    console.error(error);
  }
};

export const sendErrorMessageToSupport = (
  message: string,
  subject: string = "Error Occurred",
  extraData: string = ""
) => {
  renderAndSendEmail(
    "error",
    {
      error: message,
      extraData: extraData,
    },
    subject,
    CONFIG.SUPPORT_EMAIL
  ).catch((error) => {
    Logger.error(getErrorMessage(error));
  });
};

export const renderAndSendEmail = async (
  templateName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateData: { [key: string]: any },
  emailSubject: string,
  emailTo: string,
  mailOptions: Mail.Options = {}
) => {
  const emailContent = (await ejs.renderFile(`src/templates/${templateName}.ejs`, {
    ...templateData,
    imageBaseUrl: CONFIG.EMAIL_IMAGE_BASE_URL,
    teamName: CONFIG.TEAM_NAME,
  })) as string;

  const content = (await ejs.renderFile(`src/templates/main.ejs`, {
    content: emailContent,
    subject: emailSubject,
    imageBaseUrl: CONFIG.EMAIL_IMAGE_BASE_URL,
  })) as string;

  try {
    await sendMail(content, emailTo, emailSubject, mailOptions);
  } catch (error) {
    Logger.error(error);
  }
};

const getGmailMailTransporter = async () => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: CONFIG.EMAIL_AUTH_USERNAME,
      pass: CONFIG.EMAIL_AUTH_PASSWORD,
    },
    secure: true, // true for 465, false for other ports
  });

  return transporter;
};

const getAWSSESMailTransporter = async () => {
  // console.log(CONFIG.EMAIL_AWSSES_REGION, CONFIG.EMAIL_AUTH_USERNAME, CONFIG.EMAIL_AUTH_PASSWORD);

  const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: CONFIG.EMAIL_AWSSES_REGION,
    credentials: {
      accessKeyId: CONFIG.EMAIL_AUTH_USERNAME,
      secretAccessKey: CONFIG.EMAIL_AUTH_PASSWORD,
    },
  });

  const transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  return transporter;
};

const sendMail = async (
  htmlEmailContent: string,
  receiver: string,
  subject: string,
  mailOptions: Mail.Options = {}
) => {
  try {
    const transporter =
      CONFIG.EMAIL_TRANSPORT === "AWSSES" ? await getAWSSESMailTransporter() : await getGmailMailTransporter();

    const mailData = {
      from: `${CONFIG.EMAIL_FROM_NAME} <${CONFIG.EMAIL_FROM_EMAIL}>`, // sender address
      to: receiver,
      subject: subject,
      html: htmlEmailContent,
      ...mailOptions,
    };

    const sendMailResponseObj = await transporter.sendMail(mailData);

    if (sendMailResponseObj && CONFIG.EMAIL_TRANSPORT === "ETHEREAL") {
      Logger.info("Preview URL: " + nodemailer.getTestMessageUrl(sendMailResponseObj));
    }

    if (sendMailResponseObj && sendMailResponseObj.messageId) {
      return sendMailResponseObj;
    }
  } catch (err) {
    throw err;
  }
};
