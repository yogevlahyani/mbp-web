import React, { useMemo } from "react";
import { AspectRatio, Center } from "@chakra-ui/react";

export interface WeeklyVideoProps {
  id: string;
  name: string;
  url: string;
}

export const WeeklyVideo: React.FC<WeeklyVideoProps> = ({ name, url }) => {
  const video = useMemo(() => {
    if (url.includes("youtube.com")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        const youtubeId = match[2];

        return (
          <iframe
            title={name}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allowFullScreen
          />
        );
      }
    }

    return (
      <video width="320" height="240" controls>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    );
  }, [url, name]);

  return <Center>{video}</Center>;
};
