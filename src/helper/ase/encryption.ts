import * as crypto from 'node:crypto';

// 加密
function encryption(message) {
  // 初始化数据
  const key = crypto.randomBytes(32); // 32位随机共享密钥
  const iv = crypto.randomBytes(16); // 初始向量，16字节
  const algorithm = 'aes-256-gcm'; // 加密算法和操作模式
  const text = String(message); // 将需要加密的数据转成字符串
  // 初始化加密算法
  const cipher = crypto.createCipheriv(algorithm, key, iv); // 传入创建密钥所需参数
  let encrypted = cipher.update(text, 'utf8', 'hex'); // 初始化加密密文
  encrypted += cipher.final('hex'); // 加密密文
  const tag = cipher.getAuthTag(); // 生成标签，用于验证密文的来源
  return [encrypted, tag, key, iv, algorithm]; // 返回加密密文和密文来源信息
}

export default encryption;
