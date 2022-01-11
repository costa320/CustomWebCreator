import XLSX from "xlsx";
import { saveAs } from "./FileSaver";

export function downloadAsExcel(dataJson, fileName) {
  const worksheet = XLSX.utils.json_to_sheet(dataJson);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const ExcelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAsExcel(ExcelBuffer, fileName);
}

function saveAsExcel(buffer, filename = "export", ext = ".xlsx") {
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, `${filename}${ext}`);
}
