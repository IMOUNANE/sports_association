import { verifyToken } from '../../lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
declare module 'next/server' {
    interface NextRequest {
      user: string;
    }
  }
export const authenticateToken = (req: NextRequest) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Token missing' }, { status: 401 });
  }
  try {
    const user = verifyToken(token);
    if(user){
      req.user = user;
    }
    return user
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
};
