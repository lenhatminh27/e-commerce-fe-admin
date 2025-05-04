import Language from "../../shared/components/Language"
import { CiCircleCheck } from "react-icons/ci"
import { t } from "i18next"
import CustomButton from "../../shared/components/Button"

interface CHangePasswordSuccessProps {
  handleBackToSignIn: () => void
}

function ChangePasswordSuccess(props: CHangePasswordSuccessProps) {
  const { handleBackToSignIn } = props
  return (
    <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto md:rounded mt-[50px] space-y-4 bg-gray-50 py-[20px] md:py-[50px]">
      <div className="absolute top-[10px] right-[20px]">
        <Language />
      </div>
      <CiCircleCheck size={"150"} color="green" />
      <h1 className="text-xl text-green-700">
        {t("auth.changePassword.success")}
      </h1>
      <CustomButton
        className="w-4/5 bg-transparent border-2 border-gray-300 text-blue-500"
        onPress={handleBackToSignIn}>
        {t("auth.login.backToSignIn")}
      </CustomButton>
    </div>
  )
}

export default ChangePasswordSuccess
