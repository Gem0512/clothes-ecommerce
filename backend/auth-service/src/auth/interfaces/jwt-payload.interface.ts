export interface JwtPayload {
  username: string;
  sub: number; // ID của người dùng hoặc bất kỳ thông tin định danh nào khác
}
