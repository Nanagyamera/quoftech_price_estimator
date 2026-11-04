const studentSlider = document.getElementById("studentSlider");
const studentInput = document.getElementById("studentInput");
const studentDisplay = document.getElementById("studentDisplay");
const smsToggle = document.getElementById("smsToggle");

// Sync slider & text input
studentSlider.addEventListener("input", (e) => {
  studentInput.value = e.target.value;
  calculatePricing();
});

studentInput.addEventListener("input", (e) => {
  let val = parseInt(e.target.value) || 0;
  studentSlider.value = val;
  calculatePricing();
});

function calculatePricing() {
  const students = parseInt(studentInput.value) || 0;
  const model = document.querySelector(
    'input[name="paymentModel"]:checked',
  ).value;
  const tier = document.querySelector(
    'input[name="packageTier"]:checked',
  ).value;
  const includeSMS = smsToggle.checked;

  studentDisplay.innerText = `${students} Students`;
  document.getElementById("summaryHeaderCount").innerText =
    `${students} Students Enrolled`;

  // Base Rates
  let saasRate = tier === "standard" ? 5 : 8;
  let oneTimeRate = tier === "standard" ? 10000 : 12000;
  let smsRate = tier === "standard" ? 300 : 100;

  document.getElementById("smsPriceLabel").innerText = `GHS ${smsRate} / year`;

  let hostingCostAnnual = 3000;
  let actualSmsCost = includeSMS ? smsRate : 0;

  let termlySoftware = 0;
  let annualSoftware = 0;
  let year1Total = 0;
  let year2Ongoing = 0;

  if (model === "saas") {
    termlySoftware = students * saasRate;
    annualSoftware = termlySoftware * 3;
    year1Total = annualSoftware + hostingCostAnnual + actualSmsCost;
    year2Ongoing = year1Total;

    document.getElementById("softwareTitle").innerText =
      `SaaS Subscription (${tier === "standard" ? "Standard" : "Full Package"})`;
    document.getElementById("softwareDetail").innerText =
      `GHS ${saasRate} × ${students} students × 3 terms`;
    document.getElementById("termlySoftwareCost").innerText =
      `GHS ${termlySoftware.toLocaleString()}`;
    document.getElementById("termlySubtitle").innerText =
      `Software fee per term (${students} students)`;
  } else {
    termlySoftware = 0;
    annualSoftware = oneTimeRate;
    year1Total = oneTimeRate + hostingCostAnnual + actualSmsCost;
    year2Ongoing = hostingCostAnnual + actualSmsCost;

    document.getElementById("softwareTitle").innerText =
      `One-Time License Fee (${tier === "standard" ? "Standard" : "Full Package"})`;
    document.getElementById("softwareDetail").innerText =
      `Lifetime software license (Payable once)`;
    document.getElementById("termlySoftwareCost").innerText = `GHS 0`;
    document.getElementById("termlySubtitle").innerText =
      `Software fully paid upfront (One-time)`;
  }

  // Update UI
  document.getElementById("softwareAnnualTotal").innerText =
    `GHS ${annualSoftware.toLocaleString()} ${model === "onetime" ? "(One-time)" : "/ yr"}`;
  document.getElementById("totalYear1Cost").innerText =
    `GHS ${year1Total.toLocaleString()}`;
  document.getElementById("breakdownYear1Total").innerText =
    `GHS ${year1Total.toLocaleString()}`;
  document.getElementById("year2OngoingCost").innerText =
    `GHS ${year2Ongoing.toLocaleString()} / yr`;

  // SMS details
  document.getElementById("smsCostDisplay").innerText = includeSMS
    ? `GHS ${smsRate} / yr`
    : "GHS 0";
  document.getElementById("smsDetailText").innerText =
    tier === "full"
      ? "Discounted GHS 100/yr rate (Guardian Portal active)"
      : "Standard GHS 300/yr rate";

  // Recommended Fee Recovery per student per term
  let perTermAllInclusive = year1Total / 3 / (students || 1);
  let suggestedFee = Math.ceil(perTermAllInclusive);
  document.getElementById("recommendedFeePerTerm").innerText =
    `GHS ${suggestedFee.toFixed(2)}`;

  // Callout box behavior
  const callout = document.getElementById("smsSavingsCallout");
  if (tier === "standard") {
    callout.classList.remove("hidden");
  } else {
    callout.classList.remove("hidden");
  }
}

// Initial run
calculatePricing();
