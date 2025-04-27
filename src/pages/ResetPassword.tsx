import CustomButton from "../shared/components/Button"
import CustomInput from "../shared/components/Input"
import { useTranslation } from "react-i18next"
import Language from "../shared/components/Language"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
} from "../redux/account/account.service"
import { InputOtp } from "@heroui/react"
import { VerifyCodeError } from "../shared/types/account"
import CustomCountdown from "../shared/components/Countdown"
import { CiCircleCheck } from "react-icons/ci"

interface ChangePasswordForm {
  password: string
  confirmPassword: string
}
interface ChangePasswordFormError {
  passwordError: string
  confirmPasswordError: string
}

const ResetPassword = () => {
  const [step, setStep] = useState<number>(1)
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [inputError, setInputError] = useState<string>("")
  const [verifyCodeError, setVerifyCodeError] =
    useState<VerifyCodeError | null>(null)
  const [time, setTime] = useState<number>(300000)
  const [start, setStart] = useState<number>(Date.now())
  const [resetToken, setResetToken] = useState<string>("")
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordForm>({ password: "", confirmPassword: "" })
  const [changePasswordFormError, setChangePasswordFormError] =
    useState<ChangePasswordFormError>({
      passwordError: "",
      confirmPasswordError: "",
    })

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation()
  const [verifyCode, { isLoading: isVerifyCodeLoading }] =
    useVerifyCodeMutation()
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation()

  const handleBackToSignIn = () => {
    navigate("/login")
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputError) {
      setInputError("")
    }
    setEmail(e.target.value)
  }

  //Step1
  const handleResetPassword = async () => {
    let isValid = true
    if (email.trim() === "") {
      setInputError("empty email")
      isValid = false
    }
    if (isValid) {
      try {
        await forgotPassword({
          email: email,
        }).unwrap()
        setStart(Date.now())
        setEmail(email)
        setStep((prev) => prev + 1)
        setInputError("")
      } catch (error: any) {
        const err = error?.data.error.email
        if (err) {
          setInputError(err)
        }
      }
    }
  }

  //Step 2
  const handleInputOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (verifyCodeError) {
      setVerifyCodeError(null)
    }
    setCode(e.target.value)
  }
  const handleConfirmEmail = async () => {
    try {
      await verifyCode({
        email: email,
        code: code,
      })
        .unwrap()
        .then((res) => setResetToken(res.resetToken))

      setStep((prev) => prev + 1)
      setVerifyCodeError(null)
    } catch (error: any) {
      const err: VerifyCodeError = error?.data?.error
      console.log(err)
      if (err.email) {
        console.log(err.email)
        setVerifyCodeError((prev) => ({ ...prev, email: err.email }))
      }
      if (err.code) {
        setVerifyCodeError((prev) => ({ ...prev, code: err.code }))
        console.log(err.code)
      }
    }
  }

  const handleResendCode = async () => {
    try {
      await forgotPassword({
        email: email,
      }).unwrap()
      setTime(300000)
      setStart(Date.now())
    } catch (error: any) {
      const err = error?.data.error.email
      if (err) {
        setInputError(err)
      }
    }
  }

  //Step 3
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (
      changePasswordFormError.passwordError ||
      changePasswordFormError.confirmPasswordError
    ) {
      setChangePasswordFormError({
        passwordError: "",
        confirmPasswordError: "",
      })
    }
    setChangePasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = async () => {
    let isValid = true
    if (changePasswordForm.password.trim() === "") {
      isValid = false
      setChangePasswordFormError((prev) => ({
        ...prev,
        passwordError: "empty password",
      }))
    }
    if (changePasswordForm.password !== changePasswordForm.confirmPassword) {
      isValid = false
      setChangePasswordFormError((prev) => ({
        ...prev,
        confirmPasswordError: "Password and Confirm Password do not match",
      }))
    }
    if (changePasswordForm.confirmPassword.trim() === "") {
      isValid = false
      setChangePasswordFormError((prev) => ({
        ...prev,
        confirmPasswordError: "empty password",
      }))
    }

    if (isValid) {
      try {
        await changePassword({
          email: email,
          newPassword: changePasswordForm.password,
          resetToken: resetToken,
        })
        setStep((prev) => prev + 1)
      } catch (error: any) {}
    }
  }

  if (step === 1)
    return (
      <div className="">
        <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
          <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
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
            value={email}
            onChange={handleInput}
            errorMessage={t(inputError)}
            isInvalid={!!inputError}
          />
          <CustomButton
            className="bg-blue-950 text-white w-4/5 mt-2"
            onPress={handleResetPassword}
            disabled={isForgotPasswordLoading}>
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
              verifyCodeError && (verifyCodeError.email || verifyCodeError.code)
            }
            autoFocus={true}
            onChange={handleInputOtp}
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
  else if (step === 3)
    return (
      <div className="">
        <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
          <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
            <Language />
          </div>
          <div className="text-center">
            <h1 className="text-[30px] font-bold">{t("Change password")}</h1>
          </div>
          <CustomInput
            name="password"
            content={t("New password")}
            type="password"
            placeholder={t("Enter new password")}
            className="w-4/5"
            value={changePasswordForm.password}
            onChange={handleSetPassword}
            errorMessage={t(changePasswordFormError.passwordError)}
            isInvalid={!!changePasswordFormError.passwordError}
          />
          <CustomInput
            name="confirmPassword"
            content={t("Confirm password")}
            type="password"
            placeholder={t("Enter confirm password")}
            className="w-4/5"
            value={changePasswordForm.confirmPassword}
            onChange={handleSetPassword}
            errorMessage={t(changePasswordFormError.confirmPasswordError)}
            isInvalid={!!changePasswordFormError.confirmPasswordError}
          />
          <CustomButton
            className="bg-blue-950 text-white w-4/5 mt-2"
            onPress={handleChangePassword}
            disabled={isChangePasswordLoading}>
            {t("Reset password")}
          </CustomButton>
        </div>
      </div>
    )
  else
    return (
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute top-[10px] right-[20px]">
          <Language />
        </div>
        <CiCircleCheck size={"150"} color="green" />
        <h1 className="text-xl text-green-700">
          {t("Change password successfully")}
        </h1>
        <CustomButton
          className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
          onPress={handleBackToSignIn}>
          {t("Back to Sign In")}
        </CustomButton>
      </div>
    )
}

export default ResetPassword
