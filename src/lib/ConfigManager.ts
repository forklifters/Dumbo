import { readFileSync } from "fs";
import { join } from "path";
import { Themes, Colors, themes } from "./themes";

export type Configuration = {
  theme: keyof Themes;
};

const defaultConfig: Configuration = {
  theme: "WHITE"
};
Object.freeze(defaultConfig);

export default class ConfigManager {
  readonly config: Configuration = this.readConfig();

  get theme(): Colors {
    return themes[this.config.theme];
  } 

  private readConfig(): Configuration {
    const homeDirPath = process.env[
      process.platform === "win32" ? "USERPROFILE" : "HOME"
    ] as string;
    const configFilePath = join(homeDirPath, "/.dumbo", "/dumborc.json");
    const configString = readFileSync(configFilePath, "utf8");
    const config = JSON.parse(configString);

    if (this.isValidConfig(config)) {
      return config;
    } else {
      this.throwInvalidConfigExeption();
      return defaultConfig;
    }
  }

  private throwInvalidConfigExeption() {
    console.error(".dumborc is invalid");
  }

  private isValidConfig(config: any): boolean {
    const theme = config["theme"];
    if (theme === "WHITE" || theme === "BLACK") {
      if (Object.keys(config).length === Object.keys(defaultConfig).length) {
        return true;
      }
    }
    return false;
  }
}
