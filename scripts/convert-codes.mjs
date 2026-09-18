import * as XLSX from "xlsx";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = process.argv[2];
if (!inputPath) {
    console.error("Usage: node scripts/convert-codes.mjs path/to/codes.xlsx");
    process.exit(1);
}

const workbook = XLSX.readFile(inputPath);
const sheetName = workbook.SheetNames[0];
const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

const records = rows.map((row) => ({
    serial: String(row["Serial Number"]).trim(),
    code1: String(row["Verification Code 1"]).trim().toUpperCase(),
    code2: String(row["Verification Code 2"]).trim().toUpperCase(),
}));

const outputPath = path.join(__dirname, "..", "data", "verification-codes.json");
writeFileSync(outputPath, JSON.stringify(records));

console.log(`Wrote ${records.length} codes to ${outputPath}`);
