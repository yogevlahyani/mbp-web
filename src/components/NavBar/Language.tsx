import React, { useCallback } from "react";
import { Box, Flex, MenuItem, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  language: string;
  namespace?: string;
}

export const Language: React.FC<Props> = ({
  language,
  namespace = "common",
}) => {
  const { t } = useTranslation(namespace);
  const { reload, replace, pathname, asPath } = useRouter();

  const onClick = useCallback(async () => {
    await replace(pathname, asPath, { locale: language });
    reload();
  }, [language, reload, replace, pathname, asPath]);

  return (
    <MenuItem onClick={onClick}>
      <Flex flexDir="row" gridGap={5}>
        <Box position="relative" width={5} height={5}>
          <Image
            src={`https://unpkg.com/language-icons/icons/${language}.svg`}
            alt={language}
            layout="fill"
          />
        </Box>
        <Text>{t(language)}</Text>
      </Flex>
    </MenuItem>
  );
};
