import { PistonData, PistonResult, PistonRuntime } from "./types";

export const DEFAULT_URL = "https://emkc.org/api/v2/piston";

export async function getRuntimes(): Promise<PistonRuntime[]> {
    return (await fetch(`${DEFAULT_URL}/runtimes`)).json() as Promise<PistonRuntime[]>
}

export async function execute(options: PistonData) {
    return (await fetch(`${DEFAULT_URL}/execute`, {
        method: "POST",
        body: JSON.stringify({
            args: options.args,
            language: options.language,
            version: "*",
            files: options.files
        })
    })).json() as Promise<PistonResult>
}