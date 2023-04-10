//
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx';

export function readExcelFile2(fileData) {
    // var wb = XLSX.read(fileData, {type : 'binary'});
    // wb.SheetNames.forEach((sheetName) => {
    //   var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
    //   this.excelData = JSON.stringify(rowObj)
    // })
    var content = [];
    const files = fileData;
    const fileReader = new FileReader(); // construction function that can read the file content
    fileReader.onloadend = ev => {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
            type: "binary" // binary
        });
        console.log(workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
            const wsname = workbook.SheetNames[i]; //take the first sheet
            console.log("wsname");
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
            // ws.forEach((value, index, ws) => {
            //   //console.log(ws); // data for each line
            //   //content.push(ws);
            // });
            content.push(ws);
        }
        console.log(JSON.stringify(content));
    };

    fileReader.readAsBinaryString(files); // read file, trigger onload


}

export function readExcelFile(file, sheet) {
    //* * read file excel */
    return readXlsxFile(file, { sheet: sheet }).then(rows => {
        console.log(JSON.stringify(rows))
            //* * convert array to json object */
        var keys = rows[0]
            // vacate keys from main array
        var newArr = rows.slice(1, rows.length)

        var formatted = []
        var data = newArr
        var cols = keys
        var l = cols.length
        for (var i = 0; i < data.length; i++) {
            var d = data[i]
            var o = {}
            for (var j = 0; j < l; j++) o[cols[j]] = d[j]
            formatted.push(o)
        }
        console.log(JSON.stringify(formatted))
        return formatted
    })
}

export function b64toBlob(b64Data, contentType, sliceSize, fileName) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (
        var offset = 0; offset < byteCharacters.length; offset += sliceSize
    ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    console.log(byteArrays);

    return new File(byteArrays, fileName, { type: contentType });
};

export function b64toBlobPDF(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (
        var offset = 0; offset < byteCharacters.length; offset += sliceSize
    ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    console.log(byteArrays);

    return new File(byteArrays, "pot", { type: contentType });
};
