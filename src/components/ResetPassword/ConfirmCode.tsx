import { InputOtp } from "@heroui/react"
import Language from "../../shared/components/Language"
import CustomButton from "../../shared/components/Button"
import CustomCountdown from "../../shared/components/Countdown"
import { t } from "i18next"
import { useState } from "react"
import { VerifyCodeError } from "../../shared/types/account"
import {
  useForgotPasswordMutation,
  useVerifyCodeMutation,
} from "../../redux/account/account.service"

interface ConfirmCodeProps {
  code: string
  time: number
  start: number
  handleInputOtp: (e: React.ChangeEvent<HTMLInputElement>) => void
  verifyCodeError: VerifyCodeError | null
  isVerifyCodeLoading: boolean
  handleConfirmEmail: () => void
  handleResendCode: () => void
}

function ConfirmCode(props: ConfirmCodeProps) {
  const {
    code,
    time,
    start,
    handleInputOtp,
    verifyCodeError,
    isVerifyCodeLoading,
    handleConfirmEmail,
    handleResendCode,
  } = props

  const [forgotPassword] = useForgotPasswordMutation()

  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
          <Language />
        </div>
        <div className="text-center">
          <h1 className="text-[30px] font-bold">{t("Confirm Email")}</h1>
          <p className="text-gray-600">{t("Check email")}</p>
        </div>
        <InputOtp
          length={6}
          color="primary"
          allowedKeys="^[a-zA-Z]*$"
          value={code}
          isInvalid={!!verifyCodeError}
          errorMessage={
            verifyCodeError &&
            (t(verifyCodeError.email as string) ||
              t(verifyCodeError.code as string))
          }
          autoFocus={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputOtp(e)
          }
        />
        <CustomButton
          className="bg-blue-950 text-white w-4/5 mt-2"
          disabled={code.length < 6 || isVerifyCodeLoading}
          onPress={handleConfirmEmail}>
          {t("Confirm Email")}
        </CustomButton>
        <CustomCountdown
          time={time}
          start={start}
          rendered={({ minutes, seconds, completed }) => {
            if (completed) {
              return <span className="text-red-500">{t("expire code")}</span>
            } else {
              return (
                <>
                  <p>
                    {t("code message") + " "}
                    <span className="text-green-600">
                      {String(minutes).padStart(2, "0") + ":"}
                      {String(seconds).padStart(2, "0")}
                    </span>
                  </p>
                </>
              )
            }
          }}
        />

        <div className="border-b-2 border-b-gray-200 w-4/5 mt-[30px]"></div>
        <p className="text-gray-600">{t("Haven't received your code")}</p>
        <CustomButton
          className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
          onPress={handleResendCode}>
          {t("Resend code")}
        </CustomButton>
      </div>
    </div>
  )
}

export default ConfirmCode
