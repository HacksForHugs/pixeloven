import { exit, spawnComplete, spawnYarn } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import path from "path";

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) => index === "generate";

/**
 * Setup execution
 * @todo Should make my own plop
 *   generators: { [name: string]: PlopGenerator };
 *   helpers: { [name: string]: HelperFunction };
 * @description Based on https://github.com/amwmedia/node-plop/blob/master/index.d.ts
 */
const main = (argv: string[]) => {
    const scriptArgs = argv.slice(2);
    const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
    const scriptName =
        scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];
    if (scriptIndex === -1) {
        logger.error(`Unknown script ${scriptName}.`);
        exit(1);
    } else {
        const scriptResult = spawnYarn("plop", [
            "--plopfile",
            path.resolve(__dirname, "./plopfile.js"),
        ]);
        spawnComplete(scriptResult);
    }
};

export default main;
