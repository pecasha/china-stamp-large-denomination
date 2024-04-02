#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

await fs.rm(path.join(process.cwd(), "build", "images"), {
    recursive: true,
    force: true
});
