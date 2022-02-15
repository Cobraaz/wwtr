import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const DownloadPDF = ({
  detailedResult,
  overviewNumerical,
  optionValue,
  optionName,
  setIsPDFDownload,
  viewValue,
}) => {
  const LoggedInUserName = useSelector((state) => state.auth.user.name);

  const printDetailedTable = () => {
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });

    const detailedTable = (doc) => {
      const columns = [
        { header: "Parameters Evaluation", dataKey: "type" },
        { header: "Score", dataKey: "score" },
        { header: "Weight", dataKey: "weight" },
        { header: "Weighted Score", dataKey: "weightedScore" },
      ];

      detailedResult.map(
        ({ name, detailedData, parametersType }, detailedResultIndex) => {
          if (parametersType.length) {
            doc.autoTable({
              pageBreak: `${!detailedResultIndex ? "avoid" : "always"}`,
              columns: [{ dataKey: "id", header: `${name}` }],
              margin: { right: 107 },
              headStyles: {
                fillColor: [255, 255, 255],
                textColor: [3, 169, 244],
                fontSize: 18,
              },
            });
            detailedData.optionName.map((data, index) => {
              if (optionValue.includes(index)) {
                const body = [];
                body.push(...data.parameters);
                body.push({ ...data.totalScore, type: `${name} Score` });
                body.push({
                  ...data.avgScore,
                  type: `${name} Weighted Avg. Score`,
                });
                body.push({
                  ...data.comparisonScore,
                  type: `${name} Comparison Score`,
                });

                // doc.autoTable({
                //   columns: [{ dataKey: "id", header: `${data.name}` }],
                //   margin: { right: 107 },
                //   headStyles: {
                //     fillColor: [255, 255, 255],
                //     textColor: [0, 0, 0],
                //     fontSize: 12,
                //   },
                // });

                var nestedTableCell = {
                  content: "",
                  styles: { minCellHeight: body.length * 20 },
                };
                doc.autoTable({
                  pageBreak: "avoid",
                  columns: [{ dataKey: "id", header: `${data.name}` }],
                  body: [[nestedTableCell]],
                  showHead: "firstPage",
                  styles: { overflow: "hidden" },
                  theme: "plain",
                  headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    fontSize: 12,
                  },
                  didDrawCell: function (data) {
                    if (data.row.index === 0 && data.row.section === "body") {
                      doc.autoTable({
                        startY: data.cell.y + 2,
                        columns: columns,
                        body: body,
                        theme: "grid",
                        headStyles: {
                          fillColor: [241, 196, 15],
                          valign: "middle",
                          halign: "center",
                          fontSize: 12,
                        },
                        bodyStyles: {
                          valign: "middle",
                          halign: "center",
                          fontSize: 10,
                        },
                        styles: { overflow: "hidden" },
                      });
                    }
                  },
                });
                doc.rect(
                  20,
                  20,
                  pdf.internal.pageSize.width - 40,
                  pdf.internal.pageSize.height - 40,
                  "S"
                );
                // if (detailedResultIndex > 1) doc.addPage();
              }
              return index;
            });
          }
          return name;
        }
      );
    };

    detailedTable(pdf);

    // let pageCount = pdf.internal.getNumberOfPages();
    // pdf.deletePage(pageCount);
    pdf.save(`${LoggedInUserName} Detailed table result.pdf`);
  };
  const printOverallTable = () => {
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    const OverallTable = (doc) => {
      function columns() {
        return [
          { header: "Parameters Evaluation", dataKey: "type" },
          { header: "Score", dataKey: "score" },
          { header: "Weighted Score", dataKey: "weightedScore" },
        ];
      }
      doc.autoTable({
        columns: [{ dataKey: "id", header: `Overall Table` }],
        margin: { right: 107 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [3, 169, 244],
          fontSize: 18,
        },
      });

      overviewNumerical.overallResult.map(({ result }, index) => {
        if (optionValue.includes(index)) {
          const body = [];
          body.push(...result);
          doc.autoTable({
            columns: [{ dataKey: "id", header: `${optionName[index]}` }],
            margin: { right: 107 },
            headStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
              fontSize: 12,
            },
          });
          doc.autoTable({
            columns: columns(),
            body: body,
            showHead: "firstPage",
            styles: { overflow: "hidden" },
            theme: "grid",
            headStyles: {
              fillColor: [241, 196, 15],
              valign: "middle",
              halign: "center",
              fontSize: 12,
            },
            bodyStyles: {
              valign: "middle",
              halign: "center",
              fontSize: 10,
            },
            pageBreak: "auto",
          });
          doc.rect(
            20,
            20,
            pdf.internal.pageSize.width - 40,
            pdf.internal.pageSize.height - 40,
            "S"
          );
          if (!(index === 0) && index % 2 !== 0) doc.addPage();
        }
        return index;
      });
    };

    OverallTable(pdf);

    let pageCount = pdf.internal.getNumberOfPages();
    pdf.deletePage(pageCount);
    pdf.save(`${LoggedInUserName} Overview table result.pdf`);
  };

  const printDetailedGraph = (category) => {
    // create new pdf object
    // if don't choose compress as true you will end up with a large pdf file
    let pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
      compress: true,
    });
    // search for the html element(s) you need
    const canvas = document.querySelectorAll("canvas");
    let index = 1;
    // traverse the array of canvas
    canvas.forEach((canva) => {
      pdf.rect(
        20,
        20,
        pdf.internal.pageSize.width - 40,
        pdf.internal.pageSize.height - 40,
        "S"
      );
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const widthRatio = pageWidth / (canva.width + 100);
      const heightRatio = pageHeight / (canva.height + 100);
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canva.width * ratio;
      const canvasHeight = canva.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;
      // I added some options among others I added the type of the compression
      // method: FAST
      pdf.addImage(
        canva,
        "PNG",
        marginX,
        marginY,
        canvasWidth,
        canvasHeight - 10,
        `img${index}`,
        "FAST"
      );
      // so as to not end up with an extra pdf page at the end of the iteration
      if (index < canvas.length) {
        pdf.addPage();
      }
      index++;
    });
    // download the pdf
    pdf.save(`${LoggedInUserName} ${category} graph result.pdf`);
  };

  useEffect(() => {
    if (viewValue === 4) {
      printDetailedTable();
    } else if (viewValue === 3) {
      printOverallTable();
    } else if (viewValue === 2) {
      printDetailedGraph("Detailed");
    } else if (viewValue === 1) {
      printDetailedGraph("Overview");
    }
    return setIsPDFDownload(false);
    // eslint-disable-next-line
  }, []);

  return null;
};

export default DownloadPDF;
