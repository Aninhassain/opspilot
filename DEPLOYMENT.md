# OpsPilot AI - Deployment Guide

## Assessment Steps Completed ✅

1. ✅ **Built AI-powered web app** - OpsPilot AI (AI-Powered Business Operations Dashboard)
2. ✅ **Pushed code to Git** - Repository at https://github.com/Aninhassain/opspilot
3. ✅ **Wrote CI/CD pipeline** - GitHub Actions workflow in `.github/workflows/ci.yml`
4. 🔄 **Deploy to Vercel** - In progress (follow steps below)
5. ✅ **Wrote documentation** - Comprehensive README.md
6. 🔄 **Send for assessment** - After deployment is complete

## Deployment Steps

### Step 1: Commit Latest Changes

First, commit and push the latest Gemini model updates:

```bash
git add .
git commit -m "Update Gemini model list with user's available models and add deployment guide"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Verify your email

### Step 3: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `GitHub Actions`
4. Scope: Full Account
5. Click "Create"
6. **Copy the token** (you won't see it again!)

### Step 4: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Click "Import" next to `Aninhassain/opspilot`
4. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
5. Click "Deploy"
6. Wait for initial deployment to complete

### Step 5: Get Project ID

1. After deployment, go to your project in Vercel
2. Click "Settings" tab
3. Click "General"
4. Copy the "Project ID"
5. Save it somewhere safe

### Step 6: Get Organization ID

1. In Vercel, go to Settings (top right gear icon)
2. Look at the URL: `https://vercel.com/your-org-id/...`
3. The part after `vercel.com/` is your Organization ID
4. Or go to Settings → General and copy the Organization ID

### Step 7: Add GitHub Secrets

1. Go to https://github.com/Aninhassain/opspilot/settings/secrets/actions
2. Click "New repository secret"
3. Add these secrets:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel token from Step 3

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: Your Organization ID from Step 6

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: Your Project ID from Step 5

### Step 8: Add Environment Variables to Vercel

1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

   **Variable 1: GEMINI_API_KEY**
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
   - Environments: Production, Preview, Development

   **Variable 2: NEXT_PUBLIC_APP_URL**
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: Your Vercel URL (e.g., `https://opspilot.vercel.app`)
   - Environments: Production

### Step 9: Trigger Deployment

Push any change to trigger the CI/CD pipeline:

```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Or make a small change and push it.

### Step 10: Monitor Deployment

1. Go to your GitHub repo
2. Click "Actions" tab
3. Watch the workflow run
4. It should:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Run linter
   - ✅ Type check
   - ✅ Build project
   - ✅ Deploy to Vercel

### Step 11: Verify Deployment

1. Go to your Vercel dashboard
2. Click on your project
3. You should see a successful deployment
4. Click the deployment URL to test the app

## Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs for errors
2. Verify all secrets are set correctly
3. Ensure Vercel token has proper permissions
4. Check that Project ID and Org ID are correct

### Build Errors

1. Check if `npm run build` works locally
2. Verify all dependencies are installed
3. Check TypeScript errors with `npx tsc --noEmit`

### Environment Variables Not Working

1. Ensure variables are added to Vercel project settings
2. Check variable names match exactly (case-sensitive)
3. Redeploy after adding environment variables

## CI/CD Pipeline Details

The GitHub Actions workflow (`.github/workflows/ci.yml`) does:

1. **Build & Test Job:**
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies
   - Runs ESLint
   - Type checks with TypeScript
   - Builds the project
   - Uploads build artifacts

2. **Deploy Job:**
   - Only runs on main branch pushes
   - Waits for build job to succeed
   - Deploys to Vercel production
   - Uses Vercel CLI for deployment

## Quick Reference

**GitHub Repo:** https://github.com/Aninhassain/opspilot

**Vercel Dashboard:** https://vercel.com/dashboard

**Vercel Project:** https://vercel.com/your-org/opspilot

**GitHub Actions:** https://github.com/Aninhassain/opspilot/actions

## After Deployment

Once deployed, you can:

1. Share the Vercel URL
2. Monitor deployment logs in Vercel
3. View analytics in Vercel dashboard
4. Set up custom domain (optional)
5. Configure additional environment variables as needed

## Support

If you encounter issues:

1. Check GitHub Actions logs
2. Check Vercel deployment logs
3. Review this guide
4. Check the main README.md
5. Open an issue on GitHub

---

**Status:** Ready for deployment
**Last Updated:** July 26, 2026
