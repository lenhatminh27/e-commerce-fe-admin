import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
} from "../redux/account/account.service"
import { VerifyCodeError } from "../shared/types/account"
import SendCode from "../components/ResetPassword/SendCode"
import ConfirmCode from "../components/ResetPassword/ConfirmCode"
import ChangePassword from "../components/ResetPassword/ChangePassword"
import { expireTime } from "../shared/constants/code"
import ChangePasswordSuccess from "../components/ResetPassword/ChangePasswordSuccess"

export interface ChangePasswordForm {
  password: string
  confirmPassword: string
}
export interface ChangePasswordFormError {
  passwordError: string
  confirmPasswordError: string
}

const now = Date.now()

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [inputError, setInputError] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [verifyCodeError, setVerifyCodeError] =
    useState<VerifyCodeError | null>(null)
  const [step, setStep] = useState<number>(1)
  const [resetToken, setResetToken] = useState<string>("")
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordForm>({ password: "", confirmPassword: "" })
  const [changePasswordFormError, setChangePasswordFormError] =
    useState<ChangePasswordFormError>({
      passwordError: "",
      confirmPasswordError: "",
    })
  const [time, setTime] = useState<number>(expireTime)
  const [start, setStart] = useState<number>(now)

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [forgotPassword] = useForgotPasswordMutation()
  const [verifyCode, { isLoading: isVerifyCodeLoading }] =
    useVerifyCodeMutation()
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation()

  const handleBackToSignIn = () => {
    navigate("/login")
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
        setVerifyCodeError((prev) => ({
          ...prev,
          email: err.email,
        }))
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
        passwordError: "validation.password.empty",
      }))
    }
    if (changePasswordForm.password !== changePasswordForm.confirmPassword) {
      isValid = false
      setChangePasswordFormError((prev) => ({
        ...prev,
        confirmPasswordError: "auth.changePassword.notMatch",
      }))
    }
    if (changePasswordForm.confirmPassword.trim() === "") {
      isValid = false
      setChangePasswordFormError((prev) => ({
        ...prev,
        confirmPasswordError: "validation.password.empty",
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
  return (
    <>
      {step === 1 && (
        <SendCode
          email={email}
          inputError={inputError}
          setInputError={(error) => setInputError(error)}
          setEmail={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          setStep={() => setStep((prev) => prev + 1)}
          setTime={(time) => setTime(time)}
          setStart={(time) => setStart(time)}
          handleBackToSignIn={handleBackToSignIn}
        />
      )}
      {step === 2 && (
        <ConfirmCode
          code={code}
          time={time}
          start={start}
          handleInputOtp={handleInputOtp}
          verifyCodeError={verifyCodeError}
          isVerifyCodeLoading={isVerifyCodeLoading}
          handleConfirmEmail={handleConfirmEmail}
          handleResendCode={handleResendCode}
        />
      )}
      {step === 3 && (
        <ChangePassword
          changePasswordForm={changePasswordForm}
          handleSetPassword={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetPassword(e)
          }
          changePasswordFormError={changePasswordFormError}
          handleChangePassword={handleChangePassword}
          isChangePasswordLoading={isChangePasswordLoading}
        />
      )}

      {step === 4 && (
        <ChangePasswordSuccess handleBackToSignIn={handleBackToSignIn} />
      )}
    </>
  )
}

export default ResetPassword
