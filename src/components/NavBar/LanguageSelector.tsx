import React from "react";
import { Box, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { Language } from "./Language";
import { LANGUAGES } from "../../locales";

export const LanguageSelector: React.FC<{}> = () => {
  const { lang } = useTranslation("common");

  const listLanguages = useMemo(() => {
    return LANGUAGES.map((language) => (
      <Language key={language} language={language} />
    ));
  }, []);

  return (
    <Box mx={5}>
      <Menu autoSelect={false} isLazy id="languageSelector">
        <MenuButton position="relative" width={7} height={7}>
          <Image
            src={`https://unpkg.com/language-icons/icons/${lang}.svg`}
            alt={lang}
            layout="fill"
          />
        </MenuButton>
        <MenuList>{listLanguages}</MenuList>
      </Menu>
    </Box>
  );
};
