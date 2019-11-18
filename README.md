# Utils-Mailer

A program to notify roommates of their shares of the utilities of the month.

## Execution

```npm start```

## Dependencies

- **Handlebars**: email templating.
- **Nodemailer**: send emails to roommates with Gmail using Google API.

## Templates and Configurations

The email template is defined in `mail-template/mail-template.handlebars`. Nodemailer's configurations and Google API credentials are stored in `mail-config.js`. Utilities and roommates' information are stored in `shares-config.js`.

NOTE: The real `mail-config.js` and `shares-config.js` files are not published because they contain personal credentials and contact information. Example files appended with `example` in the name are published instead.
