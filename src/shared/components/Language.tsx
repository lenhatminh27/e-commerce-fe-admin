import { Image, Switch } from "@heroui/react"
import enImg from "../../assets/language/english.png"
import viImg from "../../assets/language/vietnam.png"
import { EN, LANGUAGE, VI } from "../constants/language"
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

  return (
    <Switch
      onChange={handleClick}
      value={language}
      isSelected={language === VI}
      color="default"
      size="lg"
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <Image src={viImg} className="w-[24px] h-auto" />
        ) : (
          <Image src={enImg} className="w-[27px] h-auto" />
        )
      }></Switch>
  )
}

export default Language
