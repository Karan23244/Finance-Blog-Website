export const calculateResult = (id, inputs) => {
  switch (id) {
    case "sip":
      const sipRate = inputs.rate / 100 / 12;
      const sipMonths = inputs.time * 12;
      return (
        (inputs.investment *
          (((1 + sipRate) ** sipMonths - 1) * (1 + sipRate))) /
        sipRate
      ).toFixed(2);

    case "lumpsum":
      const lumpRate = inputs.rate / 100;
      return (inputs.investment * (1 + lumpRate) ** inputs.time).toFixed(2);

    case "swp":
      const swpRate = inputs.rate / 100 / 12;
      const swpMonths = inputs.duration * 12;
      let remainingBalance = inputs.initialInvestment;

      for (let i = 0; i < swpMonths; i++) {
        remainingBalance = remainingBalance * (1 + swpRate) - inputs.withdrawal;
        if (remainingBalance <= 0) {
          return "0.00"; // Stops calculation when funds are depleted
        }
      }
      return remainingBalance.toFixed(2);

    case "mutualFund":
      const mfRate = inputs.rate / 100;
      return (inputs.investment * (1 + mfRate) ** inputs.time).toFixed(2);

    case "ppf":
      const ppfRate = inputs.rate / 100;
      return (
        inputs.investment *
        (((1 + ppfRate) ** inputs.time - 1) / ppfRate)
      ).toFixed(2);

    case "epf":
      const monthlyContribution =
        (inputs.basicSalary * (inputs.employerRate + inputs.employeeRate)) /
        100;
      const epfRate = inputs.rate / 100 / 12;
      const epfMonths = inputs.time * 12;
      return (
        (monthlyContribution *
          (((1 + epfRate) ** epfMonths - 1) * (1 + epfRate))) /
        epfRate
      ).toFixed(2);

    case "rd":
      const rdRate = inputs.rate / 100 / 12;
      return (
        (inputs.investment * ((1 + rdRate) ** inputs.time - 1) * (1 + rdRate)) /
        rdRate
      ).toFixed(2);

    case "fd":
      const fdRate = inputs.rate / 100;
      return (inputs.investment * (1 + fdRate) ** inputs.time).toFixed(2);

    case "nps":
      const npsCorpus =
        inputs.investment *
        (((1 + inputs.rate / 100 / 12) ** (inputs.time * 12) - 1) /
          (inputs.rate / 100 / 12));
      const annuity = (npsCorpus * inputs.annuityRate) / 100;
      return `Corpus: ₹${npsCorpus.toFixed(2)}, Monthly Pension: ₹${(
        annuity / 12
      ).toFixed(2)}`;

    case "retirement":
      const futureExpenses =
        inputs.expenses *
        (1 + inputs.inflationRate / 100) ** inputs.yearsToRetire;
      const corpusRequired =
        (futureExpenses *
          ((1 - (1 + inputs.rate / 100) ** -inputs.postRetirementYears) /
            (inputs.rate / 100))) /
        12;
      return corpusRequired.toFixed(2);

    case "emi":
    case "carLoan":
    case "homeLoan":
      const monthlyRate = inputs.rate / 100 / 12;
      const tenureMonths = inputs.time * 12;
      return (
        (inputs.principal * monthlyRate * (1 + monthlyRate) ** tenureMonths) /
        ((1 + monthlyRate) ** tenureMonths - 1)
      ).toFixed(2);

    case "stepUpSip":
      const stepRate = inputs.rate / 100 / 12;
      const stepMonths = inputs.time * 12;
      const stepUpFactor = 1 + inputs.stepUpRate / 100;
      let futureValue = 0;
      for (let i = 0; i < stepMonths; i++) {
        futureValue +=
          inputs.initialInvestment * stepUpFactor ** Math.floor(i / 12);
        futureValue *= 1 + stepRate;
      }
      return futureValue.toFixed(2);

    case "incomeTax":
      const taxableIncome = inputs.income - inputs.deductions;
      let tax = 0;
      if (taxableIncome <= 250000) tax = 0; // No tax for income <= 2.5L
      else if (taxableIncome <= 500000) tax = taxableIncome * 0.05;
      else if (taxableIncome <= 1000000)
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      else tax = 112500 + (taxableIncome - 1000000) * 0.3;
      return tax.toFixed(2);

    case "interestRateComparison":
      const flatInterest =
        (inputs.principal * inputs.flatRate * inputs.time) / 100;
      const flatEMI = (inputs.principal + flatInterest) / (inputs.time * 12);

      const reducingRate = inputs.reducingRate / 100 / 12;
      const interestRateComparisontenureMonths = inputs.time * 12;
      const reducingEMI =
        (inputs.principal *
          reducingRate *
          (1 + reducingRate) ** interestRateComparisontenureMonths) /
        ((1 + reducingRate) ** interestRateComparisontenureMonths - 1);

      return `Flat EMI: ₹${flatEMI.toFixed(
        2
      )}, Reducing EMI: ₹${reducingEMI.toFixed(2)}`;

    case "brokerage":
      const brokerage = (inputs.transactionAmount * inputs.brokerageRate) / 100;
      const taxes = (inputs.transactionAmount * inputs.taxes) / 100;
      return (brokerage + taxes).toFixed(2);

    case "margin":
      return (inputs.tradeValue / inputs.leverage).toFixed(2);

    case "inflation":
      const inflationfutureValue =
        inputs.currentAmount * (1 + inputs.inflationRate / 100) ** inputs.time;
      return inflationfutureValue.toFixed(2);

    case "stockAverage":
      const totalShares = inputs.shares1 + inputs.shares2;
      const totalCost =
        inputs.shares1 * inputs.price1 + inputs.shares2 * inputs.price2;
      return (totalCost / totalShares).toFixed(2);

    default:
      return "Calculation not implemented.";
  }
};
