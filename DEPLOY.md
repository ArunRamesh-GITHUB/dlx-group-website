# Deploying to Cloudflare Pages

This is a pure static site (HTML/CSS/JS). No build step is needed. Cloudflare Pages hosts it for free.

## Step 1: Push to GitHub

1. Create a new GitHub repo (e.g. `dlx-group-website`) at github.com
2. In this folder, open a terminal and run:

```bash
git init
git add .
git commit -m "Initial DLX website"
git remote add origin https://github.com/YOUR_USERNAME/dlx-group-website.git
git push -u origin main
```

## Step 2: Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your GitHub account and choose your repo
5. In the build settings:
   - **Framework preset:** None
   - **Build command:** (leave blank — no build step)
   - **Build output directory:** `/` (root, or leave blank)
6. Click **Save and Deploy**

## Step 3: Wait for deployment

Cloudflare will deploy in ~30 seconds. You'll get a URL like:
`https://dlx-group-website.pages.dev`

## Step 4: Add your own domain (optional but recommended)

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g. `dlxsolutionsgroup.co.uk`)
4. Follow the DNS instructions — if your domain is already on Cloudflare, it's automatic

## That's it!

Every time you push to your GitHub repo's main branch, Cloudflare Pages will automatically redeploy the site.

## File structure
```
DLXGROUPWEBSITE/
├── index.html          Home page
├── how-it-works.html   How the AI receptionist works
├── pricing.html        Pricing plans
├── security.html       Security & compliance
├── contact.html        Contact form / book a demo
├── privacy.html        Privacy Policy (UK GDPR)
├── cookies.html        Cookie Policy
├── terms.html          Terms of Service
├── aup.html            Acceptable Use Policy
├── 404.html            Custom 404 page
├── _headers            Cloudflare security headers
├── _redirects          URL redirects
├── css/
│   └── style.css       All styles
└── js/
    └── main.js         Cookie consent, mobile nav, contact form
```

## Things to update before going live

- [ ] Replace the Google Fonts CDN link with self-hosted fonts if you want maximum privacy
- [ ] Get a proper domain and connect it (don't run a business on `.pages.dev`)
- [ ] Register for ICO data protection fee at ico.org.uk if not already done
- [ ] Test the contact form by submitting it and checking your email client opens
- [ ] Test cookie banner — clear localStorage and reload to see it again
- [ ] Update your Twilio regulatory bundle with your CRN (17033961)
