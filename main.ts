// One Star, Five Stars for the Food — entry program for the make.fun bounty
// "One Star, Five Stars for the Food" (u-po-pu-one-star-five-stars-for-the-food-f9166ee7).
//
// The entry is a single sentence of at most 200 characters: a one-star
// review of Earth written by an alien tourist who still admits the food
// was excellent. The judge weighs, in order: it must be that one-star alien
// review with the food compliment slipped in, it must sound like a real
// alien visitor — an outsider's bafflement at human habits and a grievance
// worth one star — both the complaint and the compliment must land with a
// funny turn between them, it must stay one sentence inside the limit, and
// the angle must feel fresh rather than a list of generic complaints.
//
// The grievances chosen are the two an outsider would find genuinely
// inexplicable: paying to park on a planet you already live on, and arguing
// through the meals you gathered to enjoy. The compliment then does real
// work — the invasion has been delayed twice, for the bread alone — which
// makes the food not a garnish on the review but the only thing standing
// between Earth and conquest.
//
// The program writes the line to entry.txt inside the output directory
// (argv[2], falling back to /output). The output directory is a mount point
// in the grading sandbox, so its contents are cleared, never the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star: the locals pay to park on their own planet and argue " +
  "through every meal — yet we have delayed our invasion twice for " +
  "the bread alone.";

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate counts characters, so refuse to emit anything over the cap.
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, over the 200 cap`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  clearContents(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outDir}`);
}

main();
