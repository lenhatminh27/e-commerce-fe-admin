import { Image } from "@heroui/react"
import enImg from "../../../assets/language/english.png"
import viImg from "../../../assets/language/vietnam.png"
import { EN, LANGUAGE, VI } from "../../constants/language"
import { useState } from "react"
import { useTranslation } from "react-i18next"

function Language() {
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
  const img: typeof enImg | typeof viImg = language === EN ? enImg : viImg

  return <Image onClick={handleClick} src={img} className="w-[30px] h-auto" />
}

export default Language
