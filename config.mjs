import confirm from "@inquirer/confirm";
import colors from "ansi-colors";
import { existsSync, writeFile } from "fs";
import inquirer from "inquirer";

console.clear();

if (existsSync(".env")) {
    console.log(
        `${colors.yellowBright(
            "warning:",
        )} A \`.env\` config file already exists, do you want to override it ?`,
    );

    const answer = await confirm({ message: "Continue ?", default: false });
    if (!answer) process.exit(0);
}

const answer = await inquirer.prompt([
    {
        name: "TOKEN",
        message: "The bot token (see https://core.telegram.org/api)",
        type: "input",
        default: "1234567891:ABCDEF_gHIJK1234LmnoPq56rsTuVWXY789",
        validate: (input) =>
            !/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/.test(input)
                ? "The token should look like 1234567891:ABCDEF_gHIJK1234LmnoPq56rsTuVWXY789"
                : true,
    },
    {
        name: "LOG_LEVEL",
        message: "Minimum log level",
        type: "list",
        default: "info",
        choices: ["error", "warn", "info", "http", "verbose", "debug", "silly"],
    },
    {
        name: "CACHE_LIFETIME",
        message: "Axios cache lifetime (in minutes)",
        type: "number",
        default: 30,
        validate: (input) => (input <= 0 ? "The cache lifetime has to be greater than zero" : true),
    },
]);

const appConfig = {
    ...answer,
    RESTRICT_TO: "",
};

const env = Object.entries(appConfig)
    .map(([a, b]) => `${a}=${b}`)
    .join("\n");

writeFile("./.env", env, (error) => {
    if (error) {
        console.log(`${colors.redBright("error:")} ${error}`);
        return;
    }

    console.log(`${colors.greenBright("success:")} Configuration done. You can now start the bot`);
    console.log(env);
});
