import { Command } from "pwb/core/command";

import BreatheCommand from "./breathe";
import ComboChartCommand from "./comboChart";
import CombosCommand from "./combos";
import DxmCalcCommand from "./dxmCalc";
import EffectInfoCommand from "./effectInfo";
import EffectsCommand from "./effects";
import InfoCommand from "./info";
import KetamineCalcCommand from "./ketamineCalc";
import PingCommand from "./ping";

export const commands: Command[] = [
    BreatheCommand,
    ComboChartCommand,
    CombosCommand,
    DxmCalcCommand,
    EffectInfoCommand,
    EffectsCommand,
    InfoCommand,
    KetamineCalcCommand,
    PingCommand,
];
