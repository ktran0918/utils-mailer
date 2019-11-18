# Utils-Mailer

A program to notify roommates of their shares of the utilities of the month.

## Execution

```npm start```

## Dependencies

- **Handlebars**: email templating.
- **Nodemailer**: send emails to roommates with Gmail using Google API.

## Templates and Configurations

The email template is defined in `mail-template/mail-template.handlebars`. Nodemailer's configurations and Google API credentials are stored in `mail-config.js`. Utilities and roommates' information are stored in `shares-config.js`.

The contents of `mail-config.js` and `shares-config.js` have been emptied for public. What remain are templates to be filled in by the user.
