import type { VercelRequest, VercelResponse } from '@vercel/node'

//const allowedOrigins = ['https://bahaferchichi.com']; // Replace with your allowed domain(s)

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

 // if (origin && allowedOrigins.includes(origin)) {
    const { name = 'World' } = req.query;
    return res.json({
      message: `Hello my name is baha`,
    });
  //} else {
  //  res.status(403).json({ message: 'Access denied' });
//}
  }