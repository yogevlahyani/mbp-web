const embedYoutubeUrl = (url: string) => {
  if (url.includes('youtube.com')) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      const youtubeId = match[2];

      return `https://www.youtube.com/embed/${youtubeId}`;
    }
  }

  return url;
};

export default embedYoutubeUrl;
