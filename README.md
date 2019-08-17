# Utils-Mailer
A program to notify roommates of their shares of the utilities of the month.

## Execution
```node utils-mailer.js [amount1 amount2 ...]```

## Dependencies
**handlebars** is used for email templating. **nodemailer** is used to send emails to roommates from the user's email address.

## Templates and Configurations
The email template is defined in `mail-template.handlebars`. nodemailer's configurations are stored in `mail-config.js`. Roommates' information&mdash;name, email, portion (utilities share proportion)&mdash;is stored in `sharers.js`.

The contents of `mail-config.js` and `sharers.js` have been emptied for public. What remain are templates to be filled in by the user.