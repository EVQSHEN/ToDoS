import { type NextRequest,NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;

  const token = request.cookies.get('token')?.value;
  if (!pathName.startsWith('/login') && !pathName.startsWith('/signup')) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authorization/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return NextResponse.redirect('/login');
      }
    } catch (error) {
      url.pathname = '/login';
      return NextResponse.redirect(url.href);
    }
  }
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|dark.webp).*)',
    '/((?!api|_next/static|_next/image|light.webp).*)',
  ],
};
