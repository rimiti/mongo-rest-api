import crypto from 'crypto';

/**
 * @description Encrypts value.
 * @param value {string}
 * @return {string}
 */
export default (value) => {
  return crypto
    .createHash(process.env.API_PASSWORD_TYPE)
    .update(value + process.env.API_PASSWORD_SALT)
    .digest(process.env.API_PASSWORD_DIGEST);
};
