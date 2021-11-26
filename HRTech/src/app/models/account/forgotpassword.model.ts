export interface ForgotPassword {
    email: string;
    clientURI: string;
}

export interface ResetPasswordDto {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}