# 🚀 MongoDB Atlas + Render.com Setup Guide

## Step 1: Get MongoDB Atlas Connection String

1. **MongoDB Atlas** में जाएं: https://cloud.mongodb.com
2. **Database** → **Connect** → **Connect to your application**
3. **Connection string** copy करें
4. **Password** replace करें (आपका actual password)

### Example Connection String:
```
mongodb+srv://username:your_password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
```

## Step 2: Set Render.com Environment Variables

1. **Render.com Dashboard** में जाएं
2. **Book_Store_CRUD** → **Environment**
3. **Environment Variables** section में जाएं
4. **Add Environment Variable** पर click करें

### Add These Variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://username:your_password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |

## Step 3: Redeploy

1. **Manual Deploy** करें या
2. GitHub से **automatic deploy** होगा

## Step 4: Test

Deploy के बाद logs check करें:
- ✅ "Environment: Production" दिखना चाहिए
- ✅ "Database connected successfully" दिखना चाहिए
- ❌ कोई "ECONNREFUSED" error नहीं होना चाहिए

## Troubleshooting

### If still getting ECONNREFUSED error:
1. **MONGODB_URI** correctly set है?
2. **Password** सही है?
3. **Network Access** में `0.0.0.0/0` added है?

### If getting "MONGODB_URI environment variable is required":
1. **Environment Variables** properly set हैं?
2. **Redeploy** किया है?

## Quick Test URLs

Deploy के बाद इन URLs को test करें:
- `https://your-app.onrender.com/api/health`
- `https://your-app.onrender.com/api/books/getBooks` 