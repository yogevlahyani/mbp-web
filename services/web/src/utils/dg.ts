const dg = (url: string) => {
  let dropbox_regex = /(http(s)*:\/\/)*(www\.)*(dropbox.com)/;
  let drive_regex = /(http(s)*:\/\/)*(www\.)*(drive.google.com\/file\/d\/)/;

  let drive_direct_url_regex = /^(https:\/\/drive.google.com\/uc\?id=)/;
  let dropbox_direct_url_regex = /^(https:\/\/dl.dropbox.com)/;

  if (!url) {
    return;
  }

  // if it's already a direct url
  if (url.match(drive_direct_url_regex) || url.match(dropbox_direct_url_regex)) {
    return url;
  }

  // converting dropbox url
  if (url.match(dropbox_regex)) {
    return url.replace(/(http(s)*:\/\/)*(www\.)*/, 'https://dl.');
  }

  // converting google drive url
  if (url.match(drive_regex)) {
    const urlMatches = url.replace(drive_regex, '').match(/[\w]*\//);

    if (!urlMatches?.length) {
      return url;
    }

    const id = urlMatches[0].replace(/\//, '');

    return `https://drive.google.com/uc?id=${id}`;
  }

  // if Error
  console.error('Wrong URL, not a vlid drobox or google drive url');
  return 'Wrong URL, not a vlid drobox or google drive url';
};

export default dg;
