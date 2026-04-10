# dev-portfolio

This is a static portfolio site ready for deployment on Vercel.

## What is included

- Static HTML/CSS/JS site
- `api/contact.js` serverless email endpoint
- `assets/vendor/php-email-form/validate.js` adjusted to send JSON to the API
- `package.json` with `nodemailer` dependency for Vercel serverless email delivery

## Deploying to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```
2. From project root:
   ```bash
   vercel login
   vercel
   ```
3. Set required environment variables in the Vercel dashboard or via the CLI:
   - `SMTP_HOST` (default: `smtp.gmail.com`)
   - `SMTP_PORT` (default: `587`)
   - `SMTP_USER` (your SMTP username)
   - `SMTP_PASS` (your SMTP password or app password)
   - `RECEIVING_EMAIL` (email address where contact form messages should be sent)

## Notes

- The old PHP form backend (`forms/contact.php`) is no longer used for deployment.
- The email API is served from `/api/contact`.
- No build step is required for the static site itself.

## Troubleshooting

- If contact messages fail, verify SMTP credentials and port settings.
- If Vercel returns a 404 for `/api/contact`, make sure the `api/contact.js` file exists at root.
