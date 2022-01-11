
export function UUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function downloadFileByUrl(url: any, filename: any = 'file', ext = '.pdf') {

  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', `${filename}${ext}`);
  element.target = '_blank';

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

export function get_preFix() {
  let prefix;
  try {
    prefix = GetPath();
  } catch (error) {
    prefix = ''
  }
  return prefix;
};
