import { Router, Route } from "@solidjs/router";
import Layout from "./components/Layout";
import ToolLayout from "./components/ToolLayout";

import Home from "./pages/Home";
import StandardCalculator from "./pages/math/Standard";
import HeightConverter from "./pages/unit/Height";

// Health Tools
import BMICalculator from "./pages/health/BMI";
import CalorieCounter from "./pages/health/Calorie";
import WaterIntake from "./pages/health/Water";
import HeartRate from "./pages/health/Heart";

// Finance Tools
import MortgageCalculator from "./pages/finance/Mortgage";
import CompoundInterest from "./pages/finance/Compound";
import LoanAmortization from "./pages/finance/Loan";
import CurrencyConverter from "./pages/finance/Currency";

// Dev Tools
import JSONFormatter from "./pages/dev/JSON";
import Base64Converter from "./pages/dev/Base64";
import ColorTools from "./pages/dev/Color";
import QRGenerator from "./pages/dev/QR";

// Math Tools
import GPACalculator from "./pages/math/GPA";
import PercentageCalculator from "./pages/math/Percentage";
import FractionSolver from "./pages/math/Fraction";

// Unit Tools
import TempConverter from "./pages/unit/Temp";
import VolumeConverter from "./pages/unit/Volume";

// Date Tools
import AgeCalculator from "./pages/datetime/Age";
import DateDifference from "./pages/datetime/Difference";
import Stopwatch from "./pages/datetime/Stopwatch";
import TimezoneMap from "./pages/datetime/Timezone";

// Util Tools
import DiscountCalculator from "./pages/util/Discount";
import FuelCost from "./pages/util/Fuel";

// Fun Tools
import CoinFlipper from "./pages/fun/Coin";
import RandomNumber from "./pages/fun/Random";
import LoveCalculator from "./pages/fun/Love";

// Legal Pages
import Legal from "./pages/legal/Legal";

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />

      <Route path="/legal" component={Legal} />

      <Route component={ToolLayout}>
        {/* Math Category */}
        <Route path="/math">
          <Route path="/standard" component={StandardCalculator} />
          <Route path="/gpa" component={GPACalculator} />
          <Route path="/percentage" component={PercentageCalculator} />
          <Route path="/fraction" component={FractionSolver} />
        </Route>

        {/* Unit Category */}
        <Route path="/unit">
          <Route path="/height" component={HeightConverter} />
          <Route path="/temp" component={TempConverter} />
          <Route path="/volume" component={VolumeConverter} />
        </Route>

        {/* Health Category */}
        <Route path="/health">
          <Route path="/bmi" component={BMICalculator} />
          <Route path="/calorie" component={CalorieCounter} />
          <Route path="/water" component={WaterIntake} />
          <Route path="/heart" component={HeartRate} />
        </Route>

        {/* Finance Category */}
        <Route path="/finance">
          <Route path="/mortgage" component={MortgageCalculator} />
          <Route path="/compound" component={CompoundInterest} />
          <Route path="/loan" component={LoanAmortization} />
          <Route path="/currency" component={CurrencyConverter} />
        </Route>

        {/* Dev Category */}
        <Route path="/dev">
          <Route path="/json" component={JSONFormatter} />
          <Route path="/base64" component={Base64Converter} />
          <Route path="/color" component={ColorTools} />
          <Route path="/qr" component={QRGenerator} />
        </Route>

        {/* Date category */}
        <Route path="/datetime">
          <Route path="/age" component={AgeCalculator} />
          <Route path="/difference" component={DateDifference} />
          <Route path="/stopwatch" component={Stopwatch} />
          <Route path="/timezone" component={TimezoneMap} />
        </Route>

        {/* Util Category */}
        <Route path="/util">
          <Route path="/discount" component={DiscountCalculator} />
          <Route path="/fuel" component={FuelCost} />
        </Route>

        {/* Fun Category */}
        <Route path="/fun">
          <Route path="/coin" component={CoinFlipper} />
          <Route path="/random" component={RandomNumber} />
          <Route path="/love" component={LoveCalculator} />
        </Route>
      </Route>
    </Router>
  );
}
