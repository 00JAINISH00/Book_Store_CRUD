# Vercel Environment Variable Setup Guide

## Problem
Your frontend on Vercel cannot connect to your backend on Render because the API URL is not configured.

## Solution

### Step 1: Get Your Render Backend URL
1. Go to your Render dashboard
2. Find your backend service
3. Copy the URL (it should look like: `https://your-app-name.onrender.com`)

### Step 2: Set Environment Variable in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new environment variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-render-backend-url.onrender.com`
   - **Environment**: Production (and Preview if needed)
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on your latest deployment
3. Wait for the deployment to complete

### Step 4: Test
1. Open your Vercel website
2. Check the debug info at the top (yellow bar)
3. Verify the API URL is correct
4. Try adding/fetching books

## Alternative: Hardcode the URL (Temporary Fix)
If you want to test immediately, you can temporarily hardcode the URL in `client/src/component/Home.jsx`:

```javascript
const API_BASE_URL = 'https://your-actual-render-url.onrender.com';
```

Replace `your-actual-render-url` with your actual Render backend URL.

## Troubleshooting
1. **Check browser console** for any CORS errors
2. **Verify your Render backend is running** by visiting the URL directly
3. **Test API endpoints** in Postman to ensure they work
4. **Check Render logs** for any backend errors

## Common Issues
- **CORS errors**: Make sure your backend allows requests from your Vercel domain
- **Environment variable not loading**: Make sure to redeploy after adding the variable
- **Backend not responding**: Check if your Render service is active and running 