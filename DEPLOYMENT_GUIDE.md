# Deployment Guide: TIPS Framework on Netlify

## Overview

This guide will help you deploy the TIPS Framework web application to Netlify. The application is a static site with no build process required, making deployment straightforward.

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Git installed locally (if deploying from local machine)

## Method 1: Deploy via Netlify UI (Recommended)

### Step 1: Push to GitHub

If you haven't already pushed your repository to GitHub:

```bash
# Ensure you're on the correct branch
git checkout claude/ai-training-tips-framework-01MA8QGPHTtHVWqyEdWwHJbM

# Push to GitHub
git push -u origin claude/ai-training-tips-framework-01MA8QGPHTtHVWqyEdWwHJbM
```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your repository: `mondweep/greenwichxagenticsfoundationlondon`
6. Choose the branch: `claude/ai-training-tips-framework-01MA8QGPHTtHVWqyEdWwHJbM`

### Step 3: Configure Build Settings

Netlify should auto-detect the settings from `netlify.toml`, but verify:

- **Base directory:** (leave empty)
- **Build command:** `echo 'No build command needed - static site'`
- **Publish directory:** `public`
- **Node version:** 22 (set in netlify.toml)

### Step 4: Deploy

1. Click "Deploy site"
2. Wait for deployment (usually 30-60 seconds)
3. Your site will be live at a random Netlify subdomain (e.g., `random-name-12345.netlify.app`)

### Step 5: Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to:
   - Purchase a domain through Netlify, OR
   - Connect your existing domain
4. Netlify will automatically provision SSL certificate

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open a browser for authentication.

### Step 3: Initialize Site

```bash
# From your project root
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Site name (or leave blank for random)
- Build command: (leave empty or press Enter)
- Directory to deploy: `public`

### Step 4: Deploy

```bash
# Deploy to draft URL
netlify deploy

# When ready, deploy to production
netlify deploy --prod
```

## Method 3: Drag and Drop

For quick testing:

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `public` folder onto the page
3. Your site will be deployed instantly

**Note:** This method is for testing only. For production, use Method 1 or 2.

## Post-Deployment Configuration

### Environment Variables

Currently, the application doesn't require environment variables. If you add API integrations in the future:

1. Go to Site settings → Environment variables
2. Add your variables
3. Redeploy

### Custom Redirects

The `netlify.toml` includes a redirect rule for SPA routing. All routes redirect to `index.html` with a 200 status.

### Security Headers

Security headers are configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restricted geolocation, microphone, camera

### Analytics (Optional)

Enable Netlify Analytics for visitor insights:

1. Go to Site settings → Analytics
2. Enable Netlify Analytics ($9/month)
3. View real-time visitor data

## Testing Your Deployment

### Verify Core Functionality

1. **Homepage loads:** Check hero section, navigation
2. **Framework section:** Verify pyramid display
3. **Assessment works:**
   - Fill out profile form
   - Complete scenarios
   - View results
4. **Resources:** Click resource cards, check modal popups
5. **Responsive design:** Test on mobile devices

### Test URLs

After deployment, test these paths:
- `/` - Homepage
- `/#framework` - Framework section
- `/#demo` - Demo section
- `/#resources` - Resources section
- `/#about` - About section

All should work due to the SPA redirect rule.

### Performance Testing

Use these tools to verify performance:
- **Lighthouse:** [web.dev/measure](https://web.dev/measure)
- **GTmetrix:** [gtmetrix.com](https://gtmetrix.com)
- **WebPageTest:** [webpagetest.org](https://www.webpagetest.org)

Expected scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## Continuous Deployment

Once connected to GitHub, Netlify automatically deploys on every push to your branch.

### Deploy Previews

Pull requests automatically get deploy previews:
1. Create a pull request on GitHub
2. Netlify builds a preview
3. Review changes before merging
4. Merge to deploy to production

### Build Notifications

Get notified of deployments:
1. Go to Site settings → Build & deploy → Deploy notifications
2. Add notifications for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed
3. Choose notification method (email, Slack, webhook)

## Troubleshooting

### Common Issues

**Issue: 404 on page refresh**
- **Cause:** Missing redirect rule
- **Fix:** Verify `netlify.toml` contains the SPA redirect

**Issue: JavaScript not loading**
- **Cause:** MIME type issues
- **Fix:** Check headers in `netlify.toml` for `/*.js` files

**Issue: Slow load times**
- **Cause:** No caching
- **Fix:** Verify cache headers in `netlify.toml`

**Issue: Build fails**
- **Cause:** Node version mismatch
- **Fix:** Check `.nvmrc` file specifies Node 22

### Debugging

View build logs:
1. Go to Deploys tab
2. Click on a deploy
3. View deploy log

Check function logs (if you add serverless functions):
1. Go to Functions tab
2. View real-time logs

## Custom Domain Setup

### Using Netlify DNS (Easiest)

1. Add custom domain in Netlify
2. Update nameservers at your domain registrar:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
3. Wait for DNS propagation (up to 48 hours)
4. Netlify automatically provisions SSL

### Using External DNS

1. Add custom domain in Netlify
2. Add DNS records at your provider:
   ```
   A record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```
3. Enable HTTPS in Netlify (automatic with Let's Encrypt)

## Performance Optimisation

### Already Implemented

- ✅ Cache headers for static assets
- ✅ Minified CSS (custom, no preprocessing needed)
- ✅ Modern ES modules
- ✅ Lazy loading for scroll animations
- ✅ Optimized fonts (Google Fonts)

### Future Enhancements

Consider adding:
- **Image optimisation:** Use Netlify Image CDN
- **Asset minification:** Add build step with Terser/cssnano
- **Code splitting:** Break JavaScript into smaller chunks
- **Service worker:** Add offline support with Workbox

## Monitoring

### Built-in Netlify Monitoring

- **Deploy status:** View in dashboard
- **Build minutes:** Track usage (free tier: 300 min/month)
- **Bandwidth:** Monitor data transfer (free tier: 100 GB/month)

### External Monitoring

Set up uptime monitoring:
- **UptimeRobot:** [uptimerobot.com](https://uptimerobot.com)
- **Pingdom:** [pingdom.com](https://www.pingdom.com)
- **StatusCake:** [statuscake.com](https://www.statuscake.com)

### Error Tracking

Add error tracking (optional):
- **Sentry:** For JavaScript error monitoring
- **LogRocket:** For session replay
- **Rollbar:** For error aggregation

## Costs

### Netlify Pricing

**Free Tier (Starter):**
- 300 build minutes/month
- 100 GB bandwidth/month
- 1 concurrent build
- Automatic HTTPS
- Deploy previews

**Pro Tier ($19/month):**
- 1000 build minutes/month
- 400 GB bandwidth/month
- 3 concurrent builds
- Password protection
- Form handling

### When to Upgrade

Upgrade when you:
- Exceed 100 GB bandwidth/month
- Need more than 300 build minutes
- Want password-protected staging
- Require form submissions
- Need faster builds (concurrent)

## Security Best Practices

### Already Implemented

- ✅ Security headers (XSS, clickjacking protection)
- ✅ HTTPS enforcement
- ✅ Content Security Policy headers
- ✅ No exposed secrets or API keys

### Additional Recommendations

1. **Enable DNSSEC** (if using custom domain)
2. **Set up 2FA** on Netlify account
3. **Rotate access tokens** regularly
4. **Review access logs** periodically
5. **Keep dependencies updated** (currently none!)

## Rollback Procedure

If a deployment breaks production:

### Via UI

1. Go to Deploys tab
2. Find last working deploy
3. Click "..." menu
4. Select "Publish deploy"
5. Confirm rollback

### Via CLI

```bash
# List recent deploys
netlify deploy:list

# Restore specific deploy
netlify deploy:restore <deploy-id>
```

Rollback is instant - no rebuild required.

## Maintenance

### Regular Tasks

**Weekly:**
- Check deploy status
- Review bandwidth usage
- Test core functionality

**Monthly:**
- Review analytics (if enabled)
- Check for broken links
- Test on new browser versions

**Quarterly:**
- Review and update scenarios
- Check accessibility compliance
- Update documentation

### Updates and Improvements

To deploy updates:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Netlify automatically deploys
5. Verify production site

## Support and Resources

### Netlify Documentation

- [Docs](https://docs.netlify.com)
- [Community Forum](https://answers.netlify.com)
- [Status Page](https://www.netlifystatus.com)

### Getting Help

1. **Check status page** for outages
2. **Search community forum** for similar issues
3. **Review deploy logs** for error details
4. **Contact support** (Pro tier only)

### Project Support

For TIPS Framework specific questions:
- Review project documentation in `/docs`
- Check GitHub issues
- Contact: Greenwich Agentics Foundation London

## Next Steps After Deployment

1. **Share the URL** with colleagues
2. **Gather feedback** from pilot users
3. **Monitor usage** and performance
4. **Iterate on scenarios** based on feedback
5. **Customize for your institution**
6. **Integrate with existing training programs**

## Checklist

Before launching to production:

- [ ] Tested all core functionality
- [ ] Verified on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested on mobile devices
- [ ] Checked Lighthouse scores
- [ ] Reviewed security headers
- [ ] Set up monitoring
- [ ] Configured custom domain (if applicable)
- [ ] Added SSL certificate (automatic with Netlify)
- [ ] Tested error scenarios
- [ ] Reviewed privacy and legal requirements
- [ ] Documented deployment process for team
- [ ] Set up continuous deployment
- [ ] Configured build notifications
- [ ] Added to team password manager (if protected)

---

**Congratulations!** Your TIPS Framework is now live and accessible to users worldwide. 🎉

For questions or issues, refer to the troubleshooting section or contact support.
