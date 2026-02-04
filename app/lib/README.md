# API Configuration

This directory contains utilities for managing API calls and configuration across the application.

## Environment Variables

The application uses environment variables to manage API endpoints. This allows for easy configuration across different environments (development, staging, production).

### Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update the values in `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   > **Note:** For production, change this to your production API URL

### Available Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Base URL for all API calls | `http://localhost:3000` | No |

> **Important:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put sensitive information in these variables!

## Usage

### Using Predefined Endpoints

```typescript
import { API_ENDPOINTS } from '@/app/lib/api';

// Login
const response = await fetch(API_ENDPOINTS.login, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Get products
const response = await fetch(API_ENDPOINTS.products);

// Register
const response = await fetch(API_ENDPOINTS.register, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});
```

### Using the API Base URL

```typescript
import { API_BASE_URL } from '@/app/lib/api';

const response = await fetch(`${API_BASE_URL}/api/custom-endpoint`);
```

### Using the getApiUrl Helper

```typescript
import { getApiUrl } from '@/app/lib/api';

const response = await fetch(getApiUrl('/api/custom-endpoint'));
```

### Using the apiCall Helper (with automatic auth)

```typescript
import { apiCall } from '@/app/lib/api';

// Automatically includes auth token from localStorage
const response = await apiCall('/api/protected-endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'example' })
});
```

## Available Endpoints

Current predefined endpoints in `API_ENDPOINTS`:

- `products` - GET all products
- `login` - POST user login
- `register` - POST user registration

## File Structure

```
app/lib/
├── api.ts          # API configuration and utilities
└── README.md       # This file
```

## Adding New Endpoints

To add a new API endpoint:

1. Open `app/lib/api.ts`
2. Add your endpoint to the `API_ENDPOINTS` object:

```typescript
export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/api/products`,
  login: `${API_BASE_URL}/api/login`,
  register: `${API_BASE_URL}/api/register`,
  // Add new endpoint here
  myNewEndpoint: `${API_BASE_URL}/api/my-new-endpoint`,
} as const;
```

## Best Practices

1. ✅ **Always use `API_ENDPOINTS` or `API_BASE_URL`** - Never hardcode URLs
2. ✅ **Use `apiCall()` for authenticated requests** - It automatically includes the auth token
3. ✅ **Keep `.env.local` out of version control** - It's already in `.gitignore`
4. ✅ **Commit `.env.example`** - So other developers know what variables are needed
5. ❌ **Never commit sensitive data** - Use environment variables for secrets

## Troubleshooting

### API calls failing with CORS errors

Make sure your backend server allows requests from your frontend origin. Check your API server's CORS configuration.

### Environment variable not updating

After changing `.env.local`, restart your development server:

```bash
npm run dev
```

### Getting "undefined" for API_BASE_URL

- Ensure the variable name starts with `NEXT_PUBLIC_`
- Restart your dev server after creating/modifying `.env.local`
- Check that `.env.local` is in the root of your project (same level as `package.json`)

## Security Notes

- ⚠️ **`NEXT_PUBLIC_` variables are exposed to the browser** - Never use them for secrets
- ⚠️ **Auth tokens should be stored securely** - Currently using localStorage (consider httpOnly cookies for production)
- ⚠️ **Always validate on the backend** - Frontend validation is not secure

## Migration from Hardcoded URLs

All instances of hardcoded `localhost:3000` have been replaced with environment variables:

- ✅ `app/login/page.tsx`
- ✅ `app/register/page.tsx`
- ✅ `app/data/fetchProduct.tsx`
- ✅ `app/shop/[product]/page.tsx`
