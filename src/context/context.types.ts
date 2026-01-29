
export type TLoginData = {
  phone: string;
  nationalCode: string;
  verificationCode?: string;
};

export type TVerificationCode = {
  verificationCode: string;
};

export type ItemVerification = {
  phone: string;
  nationalCode: string;
};

export type TVerificationOTP = {
  verificationCode: string;
  phone: string;
};



