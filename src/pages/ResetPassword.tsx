import CustomButton from "../shared/components/Button/Button"
import CustomInput from "../shared/components/Input/Input"
import { useTranslation } from "react-i18next"
import Language from "../shared/components/Language/Language"
import { useNavigate } from "react-router-dom"
import { STEP } from "../shared/constants/resetPassword"

const ResetPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const step: number =
    (localStorage.getItem(STEP) &&
      parseInt(localStorage.getItem(STEP) as string)) ||
    1

  const handleBackToSignIn = () => {
    navigate("/login")
  }
  if (step === 1)
    return (
      <div className="">
        <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
          <div className="absolute right-[20px]">
            <Language />
          </div>
          <div className="text-center">
            <h1 className="text-[30px] font-bold">{t("Password Reset")}</h1>
            <p className="text-gray-600">
              {t("We will help you reset your password")}
            </p>
          </div>
          <CustomInput
            content="Email"
            placeholder={t("Enter email address")}
            className="w-4/5"
          />
          <CustomButton className="bg-blue-950 text-white w-4/5 mt-2">
            {t("Reset password")}
          </CustomButton>
          <div className="border-b-2 border-b-gray-200 w-4/5 mt-[30px]"></div>
          <p className="text-gray-600">{t("Remembered your password")}</p>
          <CustomButton
            className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
            onPress={handleBackToSignIn}>
            {t("Back to Sign In")}
          </CustomButton>
        </div>
      </div>
    )
  else if (step === 2)
    return (
      <div className="">
        <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
          <div className="absolute right-[20px]">
            <Language />
          </div>
          <div className="text-center">
            <h1 className="text-[30px] font-bold">{t("Confirm Email")}</h1>
            <p className="text-gray-600">{t("Check email")}</p>
          </div>
          <CustomInput
            content={t("Confirmation Code")}
            placeholder={t("Enter Code")}
            className="w-4/5"
          />
          <CustomButton className="bg-blue-950 text-white w-4/5 mt-2">
            {t("Confirm Email")}
          </CustomButton>
          <div className="border-b-2 border-b-gray-200 w-4/5 mt-[30px]"></div>
          <p className="text-gray-600">{t("Haven't received your code")}</p>
          <CustomButton className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500">
            {t("Resend code")}
          </CustomButton>
        </div>
      </div>
    )
}

export default ResetPassword
