/**
 * Returns the dataURL for the chart to generate the image.
 * @param chart requires a Chart instance of Dataurl
 * @returns Returns the dataURL of the chart
 */
export function toDataURL(chart: Chart) {
  const canvas = chart.getCanvas();
  const renderer = chart.renderer;
  const canvasDom = canvas.get("el");
  let dataURL = "";
  if (renderer === "svg") {
    const clone = canvasDom.cloneNode(true);
    const svgDocType = document.implementation.createDocumentType(
      "svg",
      "-//W3C//DTD SVG 1.1//EN",
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"
    );
    const svgDoc = document.implementation.createDocument(
      "http://www.w3.org/2000/svg",
      "svg",
      svgDocType
    );
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    const svgData = new XMLSerializer().serializeToString(svgDoc);
    dataURL = "data:image/svg+xml;charset=utf8," + encodeURIComponent(svgData);
  } else if (renderer === "canvas") {
    dataURL = canvasDom.toDataURL("image/png");
  }
  return dataURL;
}

/**
 * Chart pictures exported
 * @param chart chart instance
 * @param name image name, optional, default name 'G2Chart'
 */
interface Chart { renderer?: any }

export function downloadImage(chart: Chart, name: string = "G2Chart") {
  const link = document.createElement("a");
  const renderer = chart.renderer;
  const filename = `${name}${renderer === "svg" ? ".svg" : ".png"}`;
  const canvas = chart.getCanvas();
  canvas.get("timeline").stopAllAnimations();

  setTimeout(() => {
    const dataURL = toDataURL(chart);
    if (window.Blob && window.URL && renderer !== "svg") {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blobObj = new Blob([u8arr], { type: mime });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blobObj, filename);
      } else {
        link.addEventListener("click", () => {
          link.download = filename;
          link.href = window.URL.createObjectURL(blobObj);
        });
      }
    } else {
      link.addEventListener("click", () => {
        link.download = filename;
        link.href = dataURL;
      });
    }
    const e = document.createEvent("MouseEvents");
    e.initEvent("click", false, false);
    link.dispatchEvent(e);
  }, 16);
}
