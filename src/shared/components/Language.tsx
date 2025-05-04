import { Image } from "@heroui/react"
import enImg from "../../assets/language/english.png"
import viImg from "../../assets/language/vietnam.png"
import { EN, LANGUAGE, VI } from "../constants/language"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface LanguageProps {
  className?: string
}
function Language(props: LanguageProps) {
  const { className } = props
  const [language, setLanguage] = useState<string>(
    localStorage.getItem(LANGUAGE) || EN
  )
  const { i18n } = useTranslation()
  const handleClick = () => {
    const switchLang: typeof EN | typeof VI = language === EN ? VI : EN
    i18n.changeLanguage(switchLang)
    setLanguage(switchLang)
    localStorage.setItem(LANGUAGE, switchLang)
  }

  return (
    <div className={className + " " + "flex-shrink-0"}>
      <Image
        className="cursor-pointer w-[30px]"
        onClick={handleClick}
        src={language === "en" ? enImg : viImg}></Image>
    </div>
  )
}

export default Language
