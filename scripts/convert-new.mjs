import * as X from "xlsx";
import { readFileSync, writeFileSync } from "fs";

const XLSX = X.default ?? X;

const input = "codes.xlsx";
const output = "data/verification-codes.json";

const wb = XLSX.read(readFileSync(input), { type: "buffer" });
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const records = rows
    .slice(1)
    .filter((r) => r[0] && r[1] && r[2])
    .map((r) => ({
        serial: String(r[0]).trim(),
        code1: String(r[1]).trim().toUpperCase(),
        code2: String(r[2]).trim().toUpperCase(),
    }));

writeFileSync(output, JSON.stringify(records));

console.log(`Wrote ${records.length} codes to ${output}`);
console.log("First record:", records[0]);
console.log("Last record:", records[records.length - 1]);