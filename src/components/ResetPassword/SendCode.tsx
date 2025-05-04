import { t } from "i18next"
import CustomButton from "../../shared/components/Button"
import CustomInput from "../../shared/components/Input"
import Language from "../../shared/components/Language"
import { useForgotPasswordMutation } from "../../redux/account/account.service"
import { expireTime } from "../../shared/constants/code"

interface SendCodeProps {
  email: string
  inputError: string
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  setStep: () => void
  setTime: (time: number) => void
  setStart: (time: number) => void
  handleBackToSignIn: () => void
  setInputError: (error: string) => void
}

export default function SendCode(props: SendCodeProps) {
  const {
    email,
    inputError,
    setEmail,
    setStep,
    setTime,
    setStart,
    handleBackToSignIn,
    setInputError,
  } = props

  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation()
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputError) {
      setInputError("")
    }
    setEmail(e)
  }
  const handleResetPassword = async () => {
    let isValid = true
    if (email.trim() === "") {
      setInputError("validation.email.empty")
      isValid = false
    }
    if (isValid) {
      try {
        await forgotPassword({
          email: email,
        }).unwrap()
        setTime(expireTime)
        setStart(Date.now())
        setStep()
        setInputError("")
      } catch (error: any) {
        const err = error?.data.error.email
        if (err) {
          setInputError(err)
        }
      }
    }
  }
  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
          <Language />
        </div>
        <div className="text-center">
          <h1 className="text-[30px] font-bold">{t("auth.reset.title")}</h1>
          <p className="text-gray-600">{t("auth.reset.subtitle")}</p>
        </div>
        <CustomInput
          content="Email"
          placeholder={t("auth.register.enterEmail")}
          className="w-4/5"
          value={email}
          onChange={handleInput}
          errorMessage={t(inputError)}
          isInvalid={!!inputError}
          type="email"
        />
        <CustomButton
          className="bg-blue-950 text-white w-4/5 mt-2"
          onPress={handleResetPassword}
          disabled={isForgotPasswordLoading}>
          {t("auth.reset.button")}
        </CustomButton>
        <div className="border-b-2 border-b-gray-200 w-4/5 mt-[30px]"></div>
        <p className="text-gray-600">{t("auth.login.rememberedPassword")}</p>
        <CustomButton
          className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
          onPress={handleBackToSignIn}>
          {t("auth.login.backToSignIn")}
        </CustomButton>
      </div>
    </div>
  )
}
