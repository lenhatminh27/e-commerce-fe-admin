import CustomButton from "../shared/components/Button"
import CustomInput from "../shared/components/Input"
import { useTranslation } from "react-i18next"
import Language from "../shared/components/Language"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { LoginError, LoginRequest, LoginResponse } from "./../shared/types/auth"
import { useState } from "react"
import { useLoginMutation } from "../redux/auth/auth.service"
import Loading from "../shared/components/Loading"
import { USER_CURRENT } from "../shared/constants/user"
import { connectStomp, subscribeTo } from "../shared/lib/stompClient"

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
  const [login, { isLoading }] = useLoginMutation()
  const handleChangeLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev: LoginRequest) => ({ ...prev, [name]: value }))
    setLoginError(initialLoginForm)
    setStringError("")
  }
  const handleLogin = async () => {
    let isValid = true
    if (loginForm.username.trim() === "") {
      setLoginError((prev) => ({
        ...prev,
        username: "validation.username.empty",
      }))
      isValid = false
    }
    if (loginForm.password.trim() === "") {
      setLoginError((prev) => ({
        ...prev,
        password: "validation.password.empty",
      }))
      isValid = false
    }
    if (isValid) {
      try {
        await login(loginForm).unwrap()
        const auth = JSON.parse(
          localStorage.getItem(USER_CURRENT) as string
        ) as Omit<LoginResponse, "accessToken">
        console.log("auth:" + auth)

        connectStomp(() => {
          subscribeTo(`/notification/${auth.username}`, (msg) => {
            const content = JSON.parse(msg.body)
            console.log("📥 New message:", content)
          })
        })
        navigate("/dashboard", { replace: true })
      } catch (error: any) {
        const err = error?.data.error
        if (err && typeof err === "object") {
          setLoginError({
            username: err.username || "",
            password: err.password || "",
          })
        } else {
          setStringError("validation.login.invalid")
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
        <h1 className="text-[30px] font-bold">{t("auth.login.title")}</h1>
        {stringError && (
          <p className="text-red-500 relative left-0 w-4/5">{t(stringError)}</p>
        )}
        <CustomInput
          name="username"
          content={t("auth.login.username")}
          isInvalid={!!loginError.username}
          errorMessage={loginError.username && t(loginError.username)}
          placeholder={t("auth.register.enterUsername")}
          className="w-4/5"
          value={loginForm?.username}
          onChange={handleChangeLoginForm}
        />
        <CustomInput
          name="password"
          type="password"
          isInvalid={!!loginError.password}
          errorMessage={loginError.password && t(loginError.password)}
          content={t("auth.login.password")}
          placeholder={t("auth.register.enterPassword")}
          className="w-4/5"
          value={loginForm?.password}
          onChange={handleChangeLoginForm}
        />
        <CustomButton
          className="bg-blue-950 text-white w-4/5 mt-2"
          onPress={handleLogin}>
          {t("auth.login.button")}
        </CustomButton>
        <Link
          to={"/reset-password"}
          className="text-blue-500 border-b-2 border-b-gray-200 w-4/5 text-center pb-[20px]">
          {t("auth.login.forgotPassword")}
        </Link>
        <p>{t("auth.login.orGoogle")}</p>
        <CustomButton className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500">
          <FcGoogle size="25" />
          {t("auth.login.google")}
        </CustomButton>
      </div>
      {isLoading && <Loading />}
    </div>
  )
}

export default Login
