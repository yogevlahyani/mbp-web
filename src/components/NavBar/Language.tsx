import React, { useCallback } from 'react'
import { Box, Flex, MenuItem, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  language: string
  namespace?: string
}

export const Language: React.FC<Props> = ({ language, namespace = 'common' }) => {
  const { t } = useTranslation(namespace)
  const { asPath, defaultLocale } = useRouter()

  const onClick = useCallback(async () => {
    const path = [asPath]

    if (language !== defaultLocale) {
      path.unshift(language)
    }

    window.location.href = path.join('')
  }, [language, asPath, defaultLocale])

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
        <Text color="black">{t(language)}</Text>
      </Flex>
    </MenuItem>
  )
}
