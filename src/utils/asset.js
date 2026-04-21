// 将 /images/... 或 /audio/... 转为相对于 HTML 文档的路径
// 使 file:// 协议下也能正确加载 public/ 目录中的资源
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (path) => `${base}${path}`;
