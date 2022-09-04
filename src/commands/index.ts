import { Command } from "../core/command";
import BreatheCommand from "./breathe";
import ComboChartCommand from "./comboChart";
import DxmCalcCommand from "./dxmCalc";
import InfoCommand from "./info";
import KetamineCalcCommand from "./ketamineCalc";
import PingCommand from "./ping";

export const commands: Command[] = [
    PingCommand,
    BreatheCommand,
    ComboChartCommand,
    DxmCalcCommand,
    KetamineCalcCommand,
    InfoCommand,
];
