import confirm from "@inquirer/confirm";
import colors from "ansi-colors";
import { existsSync, writeFile } from "fs";
import inquirer from "inquirer";

console.clear();

if (existsSync("appconfig.json")) {
    console.log(
        `${colors.yellowBright(
            "warning:",
        )} An \`appconfig.json\` already exists, do you want to override it ?`,
    );

    const answer = await confirm({ message: "Continue ?", default: false });
    if (!answer) process.exit(0);
}

const answer = await inquirer.prompt([
    {
        name: "token",
        message: "The bot token (see https://core.telegram.org/api)",
        type: "input",
        validate: (input) =>
            !/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/.test(input)
                ? "The token should look like 1234567891:ABCDEF_gHIJK1234LmnoPq56rsTuVWXY789"
                : true,
    },
    {
        name: "logLevel",
        message: "Minimum log level",
        type: "list",
        default: "info",
        choices: ["error", "warn", "info", "http", "verbose", "debug", "silly"],
    },
]);

const appConfig = {
    $schema: "schemas/appconfig.schema.json",
    ...answer,
};

writeFile("./appconfig.json", JSON.stringify(appConfig, undefined, 4), (error) => {
    if (error) {
        console.log(`${colors.redBright("error:")} ${error}`);
        return;
    }

    console.log(`${colors.greenBright("success:")} Configuration done. You can now start the bot`);
});
