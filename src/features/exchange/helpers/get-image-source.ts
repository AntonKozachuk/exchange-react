const IMAGE_NAME_REGEXP = /([^/]*)(?=\.)/;

export function getImageSource(imageName: string, active: boolean = false): string {
  return `${process.env.PUBLIC_URL}${active ? imageName.replace(IMAGE_NAME_REGEXP, '$1-active') : imageName}`;
}
