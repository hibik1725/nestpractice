import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(11, {
    message: '電話番号は11桁以上で入力してください',
  })
  name: string;

  @IsString()
  @IsEmail(
    {},
    {
      message: 'メールアドレスの形式が正しくありません',
    },
  )
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'パスワードは8文字以上で入力してください',
  })
  password: string;
}
