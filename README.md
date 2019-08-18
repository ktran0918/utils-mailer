# Utils-Mailer

A program to notify roommates of their shares of the utilities of the month.

## Execution

```node utils-mailer.js```

## Dependencies

**handlebars** is used for email templating. **nodemailer** is used to send emails to roommates from the user's email address.

## Templates and Configurations

The email template is defined in `mail-template.handlebars`. nodemailer's configurations are stored in `mail-config.js`. Utilities and Roommates' information are stored in `shares-config.js`.

The contents of `mail-config.js` and `shares-config.js` have been emptied for public. What remain are templates to be filled in by the user.
