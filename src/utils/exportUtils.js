// utils/exportUtils.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToExcel = (data, fileName = 'medicos') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Médicos");
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}_${new Date().toISOString().slice(0,10)}.xlsx`);
};

export const exportToPDF = (data, fileName = 'medicos') => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(18);
  doc.text('Lista de Médicos', 14, 15);
  
  // Tabla
  const headers = [['Nombre', 'DNI', 'Especialidad', 'Años Experiencia']];
  const rows = data.map(medico => [
    medico.nombre,
    medico.dni,
    medico.especialidad,
    medico.años_experiencia
  ]);
  
  doc.autoTable({
    head: headers,
    body: rows,
    startY: 20,
    styles: {
      fontSize: 10,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    }
  });
  
  doc.save(`${fileName}_${new Date().toISOString().slice(0,10)}.pdf`);
};