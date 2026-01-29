import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useContextApp } from "@/context/AppContext";
import { AuthSteps, useAuth } from "@/context/AuthContext";
import type { TVerificationCode } from "@/context/context.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    verificationCode: yup
      .string()
      .required("کد تایید اجباری می باشد")
      .test(
        "is 6 digit",
        "کد تایید 6 رقمی می باشد",
        (value) => value?.length === 6
      ),
  })
  .required();
const LoginStepTwo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { setOTP, loginData } = useContextApp();
  const { handleOTP, setStepState } = useAuth();
  const [errorMsg, setErrorMsg] = useState<boolean | null>(null);
  const navigate = useNavigate();

  function onSubmit(data: TVerificationCode) {
    setOTP(data.verificationCode);
    const success = handleOTP(data, loginData);
    if (success) navigate("/dashboard", { replace: true });
    setErrorMsg(success);
  }

  function handleEditIdentityInfo() {
    setStepState(AuthSteps.identity);
  }

  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold text-[#32a8a2]">
              کد تایید کاربری
            </h1>
            {
              <p className="text-muted-foreground text-balance text-center">
                {`کد تایید ارسال شده به شماره ${loginData.phone} را وارد نمایید.`}
              </p>
            }
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <Controller
              name="verificationCode"
              control={control}
              render={({ field }) => (
                <InputOTP
                  dir="ltr"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={field.onChange}
                  value={field.value}
                >
                  <InputOTPGroup dir="ltr">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <p className="text-red-500 text-[13px]">
              {errors.verificationCode?.message}
            </p>
            {errorMsg === false && (
              <p className="text-red-500 text-[13px]">
                اطلاعات وارد شده صحیح نمی باشد
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full bg-[#a1c6c4] hover:bg-[#32a8a2] text-white"
          >
            تایید کد
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleEditIdentityInfo}
          >
            ویرایش اطلاعات
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginStepTwo;
