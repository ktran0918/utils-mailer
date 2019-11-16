const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

// import nodemailer configurations
const mailConfig = require('./mail-config');
// import utilities shares data
const sharesConfig = require('./shares-config');
const utils = sharesConfig.utilities;
const sharers = sharesConfig.sharers;

const date = new Date();
// Setting the dayValue 0 will set the date to the last day of the previous month
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// \u2013: en dash
const billPeriod = `${monthNames[date.getMonth() - 1]} \u2013 ${
  monthNames[date.getMonth()]
  }`;
const mailSubject = `Utilities Share in ${billPeriod}`;

var utilsTotal = 0;

/**
 * Program execution
 */
calculateShares();
sendEmail();

/**
 * Function definitions
 */
function calculateShares() {
  let i;
  for (i = 0; i < utils.length; i++) {
    // set precision of utility's cost to 2 decimal places for legibility
    utils[i].cost = utils[i].cost.toFixed(2);
    utilsTotal += utils[i].cost;
  }
  utilsTotal = Number(utilsTotal).toFixed(2);
  console.log(`Total utilities amount: ${utilsTotal}`);

  for (i = 0; i < sharers.length; i++) {
    let shareAmount = (utilsTotal * sharers[i].portion).toFixed(2);
    sharers[i].shareAmount = shareAmount;
    console.log(`${sharers[i].name}'s share: ${sharers[i].shareAmount}`);
  }
}

function createEmail(mailTemplate, recipient) {
  let placeholders = {
    senderName: 'Khoa',
    recipient: recipient,
    billPeriod: billPeriod,
    utilities: utils,
    utilsTotal: utilsTotal,
    sharers: sharers,
    lastDay: `${monthNames[date.getMonth()]} ${dateWithOrdinal(lastDay.getDate())}`
  };

  return mailTemplate(placeholders);
}

async function sendEmail() {
  mail = await readMailTemplate();
  let mailTemplate = handlebars.compile(mail);

  for (let i = 0; i < sharers.length; i++) {
    mailToSend = createEmail(mailTemplate, sharers[i]);

    let mailOptions = {
      from: mailConfig.auth.user,
      to: sharers[i].email,
      subject: mailSubject,
      html: mailToSend
    };

    const transporter = nodeMailer.createTransport(mailConfig);

    transporter.sendMail(mailOptions, (error, sendInfo) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ', sendInfo.accepted, sendInfo.response);
      }
    });
  }
}

/**
 * read "mail-template.handlebars" file
 *
 * @returns {Promise} result of file read
 */
function readMailTemplate() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      'mail-template/mail-template.handlebars',
      'utf-8',
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
}

function dateWithOrdinal(d) {
  let ordinal;
  if (d > 3 && d < 21) {
    ordinal = 'th';
  } else {
    switch (d % 10) {
      case 1:
        ordinal = 'st';
        break;
      case 2:
        ordinal = 'nd';
        break;
      case 3:
        ordinal = 'rd';
        break;
      default:
        ordinal = 'th';
        break;
    }
  }

  return d + ordinal;
}
