
// import { Request, Response, NextFunction } from 'express';
// import { ROLES } from '../constants/constants';
// import jwt, { Secret } from 'jsonwebtoken';
// import SECRET_KEY from '../config/Config';
// import asyncHandler from "express-async-handler";
// import User, { IUserRequest } from "../models/User";

// // export const protect = asyncHandler(
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     let token;

// //     if (
// //       req.headers.authorization &&
// //       req.headers.authorization.startsWith('Bearer')
// //     ) {
// //       try {
// //         const JWT_SECRET = 'abc123';
// //         token = req.headers.authorization.split(' ')[1];
// //         const decoded: any = jwt.verify(token, JWT_SECRET as string);

// //         req.user = await User.findById(decoded.id).select('-password');

// //         next();
// //       } catch (error: any) {
// //         res.status(401);
// //         throw new Error('No token, no auth');
// //       }
// //     }

// //     if (!token) {
// //       res.status(401);
// //       throw new Error('No token, no auth');
// //     }
// //   }
// // );

// export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
//   const { user } = req as any; 

//   if (user.role !== ROLES.ADMIN) {
//     return res.status(403).json({ message: 'Unauthorized: Only admin users can perform this action' });
//   }

//   next();
// };
