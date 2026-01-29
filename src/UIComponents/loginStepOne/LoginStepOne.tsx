import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContextApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import type { ItemVerification } from "@/context/context.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  phone: yup
    .string()
    .required("شماره تلفن اجباری می باشد.")
    .test(
      "is 11 digits",
      "شماره تلفن 11 رقم می باشد",
      (value) => value?.length === 11
    ),
  nationalCode: yup
    .string()
    .required("کد ملی اجباری می باشد")
    .test(
      "is 10 digits",
      "کد ملی 10 رقمی می باشد.",
      (value) => value?.length === 10
    ),
});

const LoginStepOne = () => {
  const { loginData, setIdentity } = useContextApp();
  const { handleIdentity } = useAuth();
  const [errorMsg, setErrorMsg] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: loginData.phone,
      nationalCode: loginData.nationalCode,
    },
  });

  function onSubmit(data: ItemVerification) {
    setIdentity(data);
    const success = handleIdentity(data);
    console.log("success one", success);
    setErrorMsg(success);
  }

  console.log("!msg1", errorMsg);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold text-[#32a8a2]">خوش آمدید</h1>
          <p className="text-muted-foreground text-balance">
            ورود به ناحیه کاربری
          </p>
        </div>
        <CardAction>
          <Button variant="ghost" className="border">
            ثبت نام
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                type="text"
                placeholder="09121234567"
                required
                className="text-right"
                {...register("phone")}
              />
              <p className="text-red-500 text-[13px]">
                {errors.phone?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nationalCode">کد ملی</Label>
              <Input
                id="nationalCode"
                type="text"
                placeholder="0012345678"
                required
                {...register("nationalCode")}
              />
              <p className="text-red-500 text-[13px]">
                {errors.nationalCode?.message}
              </p>
              {errorMsg === false && (
                <p className="text-red-500 text-[13px]">
                  اطلاعات وارد شده صحیح نمی باشد
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="w-full bg-[#a1c6c4] hover:bg-[#32a8a2] text-white "
        >
          تایید و ادامه
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginStepOne;
