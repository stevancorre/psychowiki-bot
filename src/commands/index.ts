import { Command } from "../core/command";
import BreatheCommand from "./breathe";
import ComboChartCommand from "./comboChart";
import PingCommand from "./ping";

export const commands: Command[] = [PingCommand, BreatheCommand, ComboChartCommand];
