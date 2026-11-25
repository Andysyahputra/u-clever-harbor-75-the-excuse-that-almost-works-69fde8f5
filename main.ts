// A moved dentist appointment is the dullest believable excuse: the
// manager cannot argue with admin, and "next slot is March" plus a
// sore jaw makes the delay too petty to have been invented.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, the dentist moved my filling to 9am today, next slot is March and it already hurts to chew";

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Self-check: read the file back as bytes and confirm it is exactly the
// intended entry, with no trailing newline or extra whitespace.
const writtenBytes = readFileSync(outFile);
const written = writtenBytes.toString("utf8");
if (!writtenBytes.equals(Buffer.from(ENTRY, "utf8"))) {
  throw new Error("entry.txt does not match the intended line byte for byte");
}
if (written.length < 1 || written.length > 140) {
  throw new Error("entry must be 1-140 characters");
}
if (written.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
const wordCount = written.trim().split(/\s+/).length;
if (wordCount > 20) {
  throw new Error(`entry must be at most 20 words, got ${wordCount}`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (written !== written.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
