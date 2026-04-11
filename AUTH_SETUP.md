# Authentication Configuration Guide

## Production vs Development Cookies

The MediStore application uses better-auth for authentication. Cookies are named differently based on the environment:

### Development Environment
- Cookie names: `better-auth.session_token` and `better-auth.session_data`
- Cookies are NOT secure (no `__Secure-` prefix)
- HTTP only

### Production Environment  
- Cookie names: `__Secure-better-auth.session_token` and `__Secure-better-auth.session_data`
- Cookies are secure (use `__Secure-` prefix required for HTTPS)
- HTTP only

## How It Works

### Server-Side (better-auth configuration)
In `MediStore_server/src/lib/auth.ts`:
```typescript
session: {
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  }
}
```

When `useSecureCookies` is true, better-auth automatically:
1. Adds `__Secure-` prefix to all cookie names
2. Sets `secure` flag (cookies only sent over HTTPS)
3. Sets `httpOnly` flag (cookies not accessible from JavaScript)

### Client-Side (cookie detection)
In `MediStore-client/src/proxy.ts`:
```typescript
const sessionToken = 
  request.cookies.get("__Secure-better-auth.session_token")?.value ||
  request.cookies.get("better-auth.session_token")?.value;
```

The proxy middleware checks for both:
1. Production cookie name (`__Secure-` prefix)
2. Development cookie name (no prefix)

This ensures seamless authentication in both environments.

## Demo Credentials

### Configuration
Demo credentials can be enabled via environment variable:
```env
NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS=true
```

### Settings
Located in `MediStore-client/src/constants/demo-credentials.ts`:
- **Email**: `admin@medistore.com`
- **Password**: `AdminDemo123!`  
- **Role**: ADMIN
- **Mode**: Demo mode only allows ADMIN login (user login is disabled)

### Usage
The login page (`/auth/login`) displays a demo credentials button that auto-fills and submits the admin credentials when clicked.

## Authentication Routes

### Available Routes
- `/auth/login` - Admin and user login
- `/auth/register` - User registration  
- `/auth/forgot-password` - Password reset

### Protected Routes by Role
- Admin: `/admin-dashboard` (read-only in demo)
- Seller: `/seller-dashboard`
- User: `/dashboard`

### Public Routes
- `/` - Homepage
- `/explore` - Medicine browsing
- `/medicine/[id]` - Product details

## Middleware Rules

The authentication middleware enforces:
1. ✅ Authenticated users cannot access auth pages (`/auth/*`)
2. ✅ Public routes are always accessible
3. ✅ Unauthenticated users are redirected to `/auth/login`
4. ✅ Role-based route authorization (admin can't access seller routes, etc.)

## Session Handling

### Session Validation
- Checked by `proxy.ts` middleware on every request
- Validates user role and authentication status
- Supports automatic redirects to appropriate dashboard

### Session Storage
- Server: Stored in PostgreSQL via Prisma
- Client: Stored in secure HTTP-only cookies
- Cache: 5-minute cookie cache for performance

## Troubleshooting

### Issue: Login fails in production
**Solution**: Verify cookies in browser developer tools:
- Should have `__Secure-` prefix
- Should have `Secure` flag (only sent over HTTPS)
- Should have `HttpOnly` flag
- Should have `SameSite: Lax`

### Issue: Session lost between environments
**Solution**: Ensure cookie names are checked correctly:
- Check proxy.ts handles both cookie name formats
- Verify `NODE_ENV` is set correctly
- Clear cookies and retry login

### Issue: Demo credentials not working
**Solution**: 
- Ensure `NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS=true` in `.env.local`
- Demo credentials button shows admin email in login page
- Only ADMIN role can login in demo mode

## Security Notes

⚠️ **Important**: 
- Demo credentials should only be enabled in development/staging
- In production, `NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS` must be `false`
- All authentication endpoints require HTTPS in production
- Session tokens have automatic expiration
- Tokens are refreshed proactively if nearing expiration
