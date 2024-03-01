// import crypto from 'crypto';
import * as crypto from 'node:crypto';
// 解密
function decrypt(cipherTextList) {
  const [encrypted, tag, key, iv, algorithm] = cipherTextList; // 导入解密内容和解密需要用到的密钥
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag); // 传入验证标签，验证密文来源，当验证标签不一致时代码报错
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export default decrypt;
