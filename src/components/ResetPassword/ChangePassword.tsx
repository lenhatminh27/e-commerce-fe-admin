import { t } from "i18next"
import {
  ChangePasswordForm,
  ChangePasswordFormError,
} from "../../pages/ResetPassword"
import CustomInput from "../../shared/components/Input"
import Language from "../../shared/components/Language"
import CustomButton from "../../shared/components/Button"

interface ChangePasswordProps {
  changePasswordForm: ChangePasswordForm
  handleSetPassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  changePasswordFormError: ChangePasswordFormError
  handleChangePassword: () => void
  isChangePasswordLoading: boolean
}

export default function ChangePassword(props: ChangePasswordProps) {
  const {
    changePasswordForm,
    handleSetPassword,
    changePasswordFormError,
    handleChangePassword,
    isChangePasswordLoading,
  } = props
  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
        <div className="absolute right-[5px] top-[-40px] md:top-[20px] md:right-[20px]">
          <Language />
        </div>
        <div className="text-center">
          <h1 className="text-[30px] font-bold">
            {t("auth.changePassword.title")}
          </h1>
        </div>
        <CustomInput
          name="password"
          content={t("auth.changePassword.newPassword")}
          type="password"
          placeholder={t("auth.changePassword.enterNewPassword")}
          className="w-4/5"
          value={changePasswordForm.password}
          onChange={handleSetPassword}
          errorMessage={t(changePasswordFormError.passwordError)}
          isInvalid={!!changePasswordFormError.passwordError}
        />
        <CustomInput
          name="confirmPassword"
          content={t("auth.changePassword.confirmPassword")}
          type="password"
          placeholder={t("auth.changePassword.enterConfirmPassword")}
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
          {t("auth.reset.button")}
        </CustomButton>
      </div>
    </div>
  )
}
