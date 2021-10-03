import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Text, Portal, VStack, useOutsideClick } from '@chakra-ui/react';

interface Props {}

export const InstallationInstructions: React.FC<Props> = () => {
  const ref = useRef(null);
  const [showInstallMessage, setShowInstallMessage] = useState<boolean>(false);

  useOutsideClick({
    ref,
    handler: () => setShowInstallMessage(false),
  });

  // Detects if device is on iOS
  const isIos = useMemo(() => {
    if (!process.browser) {
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }, []);

  // Detects if device is in standalone mode
  const isInStandaloneMode = useMemo(() => {
    if (!process.browser) {
      return;
    }

    return 'standalone' in window.navigator && (window.navigator as any).standalone;
  }, []);

  useEffect(() => {
    // Checks if should display install popup notification:
    if (isIos && !isInStandaloneMode) {
      // Change to true
      setShowInstallMessage(false);
    }
  }, [isIos, isInStandaloneMode]);

  if (!showInstallMessage) {
    return null;
  }

  return (
    <Portal>
      <VStack
        ref={ref}
        width="100%"
        position="fixed"
        bottom="30px"
        zIndex={999}
        justifyContent="center"
        gridGap={0}
      >
        <Box background="white" width="100%" p={5}>
          <Text color="black">Instructions...</Text>
          <TriangleDownIcon
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            bottom="-20px"
            width="32px"
            height="32px"
            color="white"
          />
        </Box>
      </VStack>
    </Portal>
  );
};
