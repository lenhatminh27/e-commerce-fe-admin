import { InputOtp } from "@heroui/react"
import Language from "../../shared/components/Language"
import CustomButton from "../../shared/components/Button"
import CustomCountdown from "../../shared/components/Countdown"
import { t } from "i18next"
import { VerifyCodeError } from "../../shared/types/account"
import { useState } from "react"

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

  const [isComplete, setIsComplete] = useState<boolean>(false)
  const handleComplete = () => {
    setIsComplete(true)
  }
  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
          <Language />
        </div>
        <div className="text-center">
          <h1 className="text-[30px] font-bold">
            {t("auth.confirmEmail.title")}
          </h1>
          <p className="text-gray-600">{t("auth.confirmEmail.subtitle")}</p>
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
          disabled={code.length < 6 || isVerifyCodeLoading || isComplete}
          onPress={handleConfirmEmail}>
          {t("auth.confirmEmail.title")}
        </CustomButton>
        <CustomCountdown
          key={start}
          time={time}
          start={start}
          rendered={({ minutes, seconds, completed }) => {
            if (completed) {
              return (
                <span className="text-red-500">
                  {t("validation.code.expired")}
                </span>
              )
            } else {
              return (
                <>
                  <p>
                    {t("common.code.message") + " "}
                    <span className="text-green-600">
                      {String(minutes).padStart(2, "0") + ":"}
                      {String(seconds).padStart(2, "0")}
                    </span>
                  </p>
                </>
              )
            }
          }}
          onComplete={handleComplete}
        />

        <div className="border-b-2 border-b-gray-200 w-4/5 mt-[30px]"></div>
        <p className="text-gray-600">{t("auth.confirmEmail.notReceived")}</p>
        <CustomButton
          className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
          onPress={() => {
            handleResendCode()
            setIsComplete(false)
          }}>
          {t("auth.confirmEmail.resend")}
        </CustomButton>
      </div>
    </div>
  )
}

export default ConfirmCode
