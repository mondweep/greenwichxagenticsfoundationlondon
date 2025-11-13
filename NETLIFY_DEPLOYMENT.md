# 🚀 Deploy to Netlify - Step by Step

## Quick Deploy (5 minutes)

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (already done! ✅)

2. **Go to Netlify:**
   - Visit [https://app.netlify.com](https://app.netlify.com)
   - Sign in or create free account

3. **Create New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub

4. **Select Repository:**
   - Find: `mondweep/greenwichxagenticsfoundationlondon`
   - Select branch: `claude/ai-training-tips-framework-01MA8QGPHTtHVWqyEdWwHJbM`

5. **Configure Build:**
   - Netlify will auto-detect settings from `netlify.toml`
   - Verify:
     - **Build command:** `echo 'No build command needed - static site'`
     - **Publish directory:** `public`
   - Click "Deploy site"

6. **Done!** ✨
   - Your site will be live in ~30 seconds
   - URL: `random-name-12345.netlify.app`
   - SSL certificate automatically provisioned

### Option 2: Drag & Drop (Testing Only)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `public` folder onto the page
3. Instant deployment!

**Note:** Use this only for quick testing. For production, use Option 1.

## Customizing Your Site

### Change Site Name

1. In Netlify dashboard, go to "Site settings"
2. Under "Site information" click "Change site name"
3. Enter your preferred name (e.g., `tips-framework`)
4. Your new URL: `tips-framework.netlify.app`

### Add Custom Domain

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `tips.youruniversity.edu`)
4. Follow DNS configuration instructions
5. SSL automatically provisioned

## Continuous Deployment

Every time you push to GitHub, Netlify automatically rebuilds and deploys!

```bash
# Make changes locally
vim public/index.html

# Commit and push
git add .
git commit -m "Update homepage"
git push

# Netlify automatically deploys in ~30 seconds
```

## Monitoring Your Site

### Check Deploy Status

1. Go to "Deploys" tab in Netlify
2. See real-time build logs
3. View deploy preview before production

### Analytics (Optional)

Enable Netlify Analytics for $9/month:
- Real-time visitor stats
- Top pages
- Traffic sources
- No cookies or tracking scripts needed

## Troubleshooting

### Build Failed

Check the deploy log in Netlify dashboard. Common issues:

**Issue:** "Publish directory not found"
- **Fix:** Verify `netlify.toml` has `publish = "public"`

**Issue:** JavaScript not loading
- **Fix:** Check browser console for errors
- Verify `public/js/` files exist

### Site Not Loading

1. Check Netlify status: [https://www.netlifystatus.com](https://www.netlifystatus.com)
2. Clear your browser cache
3. Try incognito/private browsing
4. Check deploy log for errors

### Wrong Content Showing

1. In Netlify, go to "Deploys"
2. Click "Trigger deploy" → "Clear cache and deploy"
3. Force fresh deployment

## Performance Tips

Your site should score 90+ on Lighthouse out of the box!

Check performance:
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Run audit
4. Review recommendations

Expected scores:
- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 90+

## Security

Netlify automatically provides:
- ✅ HTTPS (free SSL certificate)
- ✅ DDoS protection
- ✅ Security headers (configured in `netlify.toml`)
- ✅ Form spam protection

Additional security:
1. Enable 2FA on your Netlify account
2. Use branch deploy keys (automatic)
3. Review build logs regularly

## Cost

**Free Tier (Sufficient for most):**
- 300 build minutes/month
- 100 GB bandwidth/month
- Unlimited sites
- Auto HTTPS
- Continuous deployment

**When to upgrade:**
- Heavy traffic (>100GB/month)
- Need password protection
- Want form handling
- Need more build minutes

## Next Steps

After deployment:

1. ✅ **Test the site** - Go through full assessment
2. ✅ **Share with colleagues** - Get feedback
3. ✅ **Customize** - Add your institution's branding
4. ✅ **Monitor** - Set up uptime monitoring
5. ✅ **Promote** - Share the URL with your community

## Support

**Netlify Support:**
- Docs: [docs.netlify.com](https://docs.netlify.com)
- Community: [answers.netlify.com](https://answers.netlify.com)
- Status: [netlifystatus.com](https://www.netlifystatus.com)

**Project Support:**
- Read `/docs` for framework documentation
- Review `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `DEMONSTRATION_SUMMARY.md` for technical details

---

## Full Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Build settings configured
- [ ] First deploy successful
- [ ] Site name customized (optional)
- [ ] Custom domain added (optional)
- [ ] SSL certificate active
- [ ] Full assessment tested
- [ ] Mobile responsiveness verified
- [ ] Performance tested (Lighthouse)
- [ ] Analytics enabled (optional)
- [ ] Team notified
- [ ] Documentation updated with URL

---

**Congratulations!** 🎉

Your TIPS Framework is now live and accessible worldwide at your Netlify URL.

Share it with your colleagues and start building responsible AI competencies!
