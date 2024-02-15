import crypto from 'crypto';

export const generateVerifyToken = () => {
  const buffer = crypto.randomBytes(4);
  const token = buffer.toString('hex');
  return token;
};


export const getDefaultExpirationDate = () => {
    const expirationDate = new Date(Date.now() + 10 * 60 * 1000);
    return expirationDate;
  };
  
