import CustomButton from "../shared/components/Button"
import CustomInput from "../shared/components/Input"
import { useTranslation } from "react-i18next"
import Language from "../shared/components/Language"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { RootState } from "../redux/store"
import { LoginError, LoginRequest } from "./../shared/types/auth"
import { useEffect, useState } from "react"
import { useLoginMutation } from "../redux/auth/auth.service"
import { useSelector } from "react-redux"
import Loading from "../shared/components/Loading"

const initialLoginForm: LoginRequest = {
  username: "",
  password: "",
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginRequest>(initialLoginForm)
  const [loginError, setLoginError] = useState<LoginError>(initialLoginForm)
  const [stringError, setStringError] = useState<string>("")

  const { t } = useTranslation()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const [login, { isLoading }] = useLoginMutation()
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated])
  const handleChangeLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev: LoginRequest) => ({ ...prev, [name]: value }))
    if (loginError.username && name === "username") {
      setLoginError((prev: LoginError) => ({ ...prev, username: "" }))
    }
    if (loginError.password && name === "password") {
      setLoginError((prev: LoginError) => ({ ...prev, password: "" }))
    }
  }
  const handleLogin = async () => {
    let isValid = true
    if (loginForm.username.trim() === "") {
      setLoginError((prev) => ({ ...prev, username: t("empty username") }))
      isValid = false
    }
    if (loginForm.password.trim() === "") {
      setLoginError((prev) => ({ ...prev, password: t("empty password") }))
      isValid = false
    }
    if (isValid) {
      try {
        await login(loginForm).unwrap()
      } catch (error: any) {
        const err = error?.data.error
        if (err && typeof err === "object") {
          setLoginError({
            username: err.username || "",
            password: err.password || "",
          })
        } else {
          setStringError("Wrong username/password")
        }
      }
    }
  }
  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute right-[20px]">
          <Language />
        </div>
        <h1 className="text-[30px] font-bold">{t("Sign in")}</h1>
        {stringError && (
          <p className="text-red-500 relative left-0 w-4/5">{t(stringError)}</p>
        )}
        <CustomInput
          name="username"
          content={t("Username")}
          isInvalid={!!loginError.username}
          errorMessage={loginError.username && t(loginError.username)}
          placeholder={t("Enter username")}
          className="w-4/5"
          value={loginForm?.username}
          onChange={handleChangeLoginForm}
        />
        <CustomInput
          name="password"
          type="password"
          isInvalid={!!loginError.password}
          errorMessage={loginError.password}
          content={t("Password")}
          placeholder={t("Enter password")}
          className="w-4/5"
          value={loginForm?.password}
          onChange={handleChangeLoginForm}
        />
        <CustomButton
          className="bg-blue-950 text-white w-4/5 mt-2"
          onPress={handleLogin}>
          {t("Sign in")}
        </CustomButton>
        <Link
          to={"/reset-password"}
          className="text-blue-500 border-b-2 border-b-gray-200 w-4/5 text-center pb-[20px]">
          {t("Forgot your password")}
        </Link>
        <p>{t("Or sign in using")}</p>
        <CustomButton className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500">
          <FcGoogle size="25" />
          {t("Continue with Google")}
        </CustomButton>
      </div>
      {isLoading && <Loading />}
    </div>
  )
}

export default Login
