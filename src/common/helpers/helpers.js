const cutMyStrMin = (str,char) => str.replace(new RegExp(`.*?${char}(.*)`),'$1');

export { cutMyStrMin };