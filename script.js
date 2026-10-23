"use strict";

/*
  AgriMatch
  Front-end scheme matching demo.

  Important:
  - This is a sample dataset, not a complete scheme directory.
  - Verify eligibility and current application rules on official portals.
  - Matching results are informational, not a guarantee of eligibility.
*/

const schemes = [
  {
    id: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    emoji: "💰",
    tag: "Income Support",
    categories: ["income"],
    states: ["all"],
    farmerTypes: ["small", "marginal", "other", "unknown"],
    crops: ["all"],
    description:
      "Provides income support to eligible landholding farmer families under the scheme rules.",
    benefits:
      "Eligible beneficiaries receive ₹6,000 per year, generally in three instalments, subject to current rules.",
    eligibility:
      "Eligible landholding farmer families. Exclusion rules and land-record requirements apply.",
    documents: [
      "Aadhaar details",
      "Land ownership or land-record details",
      "Bank account details",
      "Other documents required by the local authority"
    ],
    process:
      "Check beneficiary status and registration guidance through the official PM-KISAN portal or your local agriculture office.",
    officialUrl: "https://pmkisan.gov.in/",
    applyUrl: "https://pmkisan.gov.in/",
    verifiedNote:
      "Confirm the latest eligibility and registration process on the official portal."
  },

  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    emoji: "🛡️",
    tag: "Crop Insurance",
    categories: ["insurance"],
    states: ["all"],
    farmerTypes: ["small", "marginal", "other", "tenant", "unknown"],
    crops: ["all"],
    description:
      "Crop insurance support for notified crops and areas against specified crop-loss risks.",
    benefits:
      "Insurance protection for eligible notified crops against covered risks, subject to policy terms.",
    eligibility:
      "Farmers growing notified crops in notified areas who meet the applicable enrolment requirements. Tenant and sharecropper documentation rules can apply.",
    documents: [
      "Identity and bank details",
      "Land or cultivation records",
      "Sowing declaration or crop details",
      "Other documents required by the insurer or state"
    ],
    process:
      "Check whether your crop and area are notified for the relevant season. Follow the current enrolment instructions and deadline.",
    officialUrl: "https://pmfby.gov.in/",
    applyUrl: "https://pmfby.gov.in/",
    verifiedNote:
      "Availability, notified crops, enrolment windows and terms vary by season and location."
  },

  {
    id: "kcc",
    name: "Kisan Credit Card (KCC)",
    emoji: "🏦",
    tag: "Farm Credit",
    categories: ["credit"],
    states: ["all"],
    farmerTypes: ["small", "marginal", "other", "tenant", "unknown"],
    crops: ["all"],
    description:
      "A bank credit facility intended to support eligible agricultural and related farming needs.",
    benefits:
      "Access to eligible agricultural credit according to the bank's assessment and applicable scheme rules.",
    eligibility:
      "Eligible farmers and other permitted agricultural borrowers, subject to lender rules and documentation.",
    documents: [
      "Identity and address proof",
      "Photographs if required",
      "Land or cultivation details, as applicable",
      "Bank application and other requested documents"
    ],
    process:
      "Contact a participating bank or cooperative bank and ask about its current Kisan Credit Card application requirements.",
    officialUrl: "https://www.myscheme.gov.in/",
    applyUrl: "https://www.myscheme.gov.in/",
    verifiedNote:
      "Loan limits, interest concessions and eligibility depend on applicable rules and the lending institution."
  },

  {
    id: "soil-health",
    name: "Soil Health Card Scheme",
    emoji: "🌱",
    tag: "Soil Health",
    categories: ["soil"],
    states: ["all"],
    farmerTypes: ["all"],
    crops: ["all"],
    description:
      "Helps farmers understand soil nutrient status and recommended soil-management practices.",
    benefits:
      "Soil-test information and nutrient recommendations to help guide fertiliser and soil management decisions.",
    eligibility:
      "Services and testing arrangements are provided through the applicable agriculture department and soil-testing system.",
    documents: [
      "Basic farmer details",
      "Farm location or land details",
      "Other information requested by the local agriculture office"
    ],
    process:
      "Contact your local agriculture department or soil-testing laboratory to ask about soil sampling and card availability.",
    officialUrl: "https://soilhealth.dac.gov.in/",
    applyUrl: "https://soilhealth.dac.gov.in/",
    verifiedNote:
      "Local testing arrangements and service availability should be confirmed with the agriculture department."
  },

  {
    id: "smam",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    emoji: "🚜",
    tag: "Farm Equipment",
    categories: ["equipment"],
    states: ["all"],
    farmerTypes: ["small", "marginal", "other", "tenant", "unknown"],
    crops: ["all"],
    description:
      "Supports agricultural mechanization through eligible assistance and related programme activities.",
    benefits:
      "Potential assistance for eligible machinery or mechanization activities under applicable components.",
    eligibility:
      "Depends on the current component, state guidelines, applicant category, equipment and available allocation.",
    documents: [
      "Identity and farmer details",
      "Land or cultivation records if required",
      "Bank details",
      "Equipment quotation and other documents required by the scheme"
    ],
    process:
      "Check the current state agriculture department instructions before purchasing equipment or submitting an application.",
    officialUrl: "https://agrimachinery.nic.in/",
    applyUrl: "https://agrimachinery.nic.in/",
    verifiedNote:
      "Do not assume a subsidy is available for every machine or applicant. Confirm the current state component first."
  },

  {
    id: "pmksy",
    name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    emoji: "💧",
    tag: "Irrigation",
    categories: ["irrigation"],
    states: ["all"],
    farmerTypes: ["small", "marginal", "other", "tenant", "unknown"],
    crops: ["all"],
    description:
      "A programme covering eligible irrigation and water-management activities through its different components.",
    benefits:
      "Potential support for eligible irrigation or water-use activities under the relevant component and state rules.",
    eligibility:
      "Requirements depend on the component, state implementation, type of activity and current guidelines.",
    documents: [
      "Farmer identity details",
      "Land or cultivation records, if required",
      "Bank details",
      "Technical or equipment details, where applicable"
    ],
    process:
      "Contact your state agriculture or irrigation department to identify the applicable component and current application route.",
    officialUrl: "https://pmksy.gov.in/",
    applyUrl: "https://pmksy.gov.in/",
    verifiedNote:
      "Not every component is open for individual applications in every area at all times."
  },

  {
    id: "enam",
    name: "National Agriculture Market (e-NAM)",
    emoji: "🧺",
    tag: "Market Access",
    categories: ["market"],
    states: ["all"],
    farmerTypes: ["all"],
    crops: ["all"],
    description:
      "An electronic agriculture-market platform connecting participating mandis and market participants.",
    benefits:
      "Market information and trading facilities through participating markets, subject to local arrangements.",
    eligibility:
      "Participation and services depend on the relevant mandi, state arrangements and registration requirements.",
    documents: [
      "Identity details",
      "Farmer or mandi registration details, as required",
      "Bank details where applicable",
      "Other documents required by the relevant mandi"
    ],
    process:
      "Visit the official portal and contact your participating mandi to understand registration and selling procedures.",
    officialUrl: "https://enam.gov.in/",
    applyUrl: "https://enam.gov.in/",
    verifiedNote:
      "e-NAM is a market platform, not a direct cash-benefit scheme. Local participation requirements apply."
  }
];

const form = document.getElementById("farmerForm");
const resultsSection = document.getElementById("results");
const resultSummary = document.getElementById("resultSummary");
const resultsContainer = document.getElementById("schemeResults");
const searchInput = document.getElementById("schemeSearch");
const filterSelect = document.getElementById("schemeFilter");
const resetButton = document.getElementById("resetButton");

let currentAnswers = null;
let matchedSchemes = [];

function getAnswers() {
  return {
    state: document.getElementById("state").value,
    farmerType: document.getElementById("farmerType").value,
    crop: document.getElementById("crop").value,
    land: document.getElementById("land").value,
    support: document.getElementById("support").value
  };
}

function matchesFarmer(scheme, answers) {
  const stateMatches =
    scheme.states.includes("all") ||
    scheme.states.includes(answers.state);

  const farmerMatches =
    scheme.farmerTypes.includes("all") ||
    scheme.farmerTypes.includes(answers.farmerType) ||
    answers.farmerType === "unknown";

  const cropMatches =
    scheme.crops.includes("all") ||
    scheme.crops.includes(answers.crop);

  const supportMatches =
    answers.support === "multiple" ||
    scheme.categories.includes(answers.support);

  return (
    stateMatches &&
    farmerMatches &&
    cropMatches &&
    supportMatches
  );
}

function getEligibleLookingSchemes(answers) {
  /*
    This function finds relevant records, not confirmed eligibility.
    The included dataset contains central scheme examples.
  */
  if (answers.support === "multiple") {
    return schemes.filter(function (scheme) {
      return (
        (scheme.states.includes("all") ||
          scheme.states.includes(answers.state)) &&
        (scheme.farmerTypes.includes("all") ||
          scheme.farmerTypes.includes(answers.farmerType) ||
          answers.farmerType === "unknown") &&
        (scheme.crops.includes("all") ||
          scheme.crops.includes(answers.crop))
      );
    });
  }

  return schemes.filter(function (scheme) {
    return matchesFarmer(scheme, answers);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return replacements[character];
  });
}

function renderList(items) {
  return items
    .map(function (item) {
      return "<li>" + escapeHTML(item) + "</li>";
    })
    .join("");
}

function createSchemeCard(scheme) {
  const name = escapeHTML(scheme.name);
  const tag = escapeHTML(scheme.tag);
  const emoji = escapeHTML(scheme.emoji);
  const description = escapeHTML(scheme.description);
  const benefits = escapeHTML(scheme.benefits);
  const eligibility = escapeHTML(scheme.eligibility);
  const process = escapeHTML(scheme.process);
  const verifiedNote = escapeHTML(scheme.verifiedNote);

  const officialUrl = escapeHTML(scheme.officialUrl);
  const applyUrl = escapeHTML(scheme.applyUrl);

  return `
    <article class="scheme-card">
      <div class="scheme-card-top">
        <div class="scheme-emoji">${emoji}</div>
        <span class="scheme-tag">${tag}</span>
      </div>

      <h3>${name}</h3>
      <p class="scheme-description">${description}</p>

      <div class="scheme-detail">
        <h4>🎁 Benefits</h4>
        <p>${benefits}</p>
      </div>

      <div class="scheme-detail">
        <h4>👥 Eligibility</h4>
        <p>${eligibility}</p>
      </div>

      <div class="scheme-detail">
        <h4>📄 Commonly requested documents</h4>
        <ul>${renderList(scheme.documents)}</ul>
      </div>

      <div class="scheme-detail">
        <h4>🪴 How to proceed</h4>
        <p>${process}</p>
      </div>

      <div class="scheme-detail">
        <h4>ℹ️ Important to know</h4>
        <p>${verifiedNote}</p>
      </div>

      <div class="scheme-actions">
        <a href="${officialUrl}" target="_blank" rel="noopener noreferrer">
          Official information ↗
        </a>
        <a href="${applyUrl}" target="_blank" rel="noopener noreferrer"
           class="secondary-link">
          Application portal ↗
        </a>
      </div>
    </article>
  `;
}

function renderResults() {
  if (!currentAnswers) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = filterSelect.value;

  const visibleSchemes = matchedSchemes.filter(function (scheme) {
    const textToSearch = [
      scheme.name,
      scheme.description,
      scheme.benefits,
      scheme.tag
    ].join(" ").toLowerCase();

    const matchesSearch = textToSearch.includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      scheme.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  if (visibleSchemes.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <div class="empty-emoji">🌱</div>
        <h3>No matching schemes found</h3>
        <p>
          Try another search term or change the support filter.
          You can also edit your answers to explore other categories.
        </p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = visibleSchemes
    .map(createSchemeCard)
    .join("");
}

function showResults() {
  currentAnswers = getAnswers();
  matchedSchemes = getEligibleLookingSchemes(currentAnswers);

  const count = matchedSchemes.length;
  const stateName = escapeHTML(currentAnswers.state);

  resultSummary.textContent =
    count +
    " scheme record" +
    (count === 1 ? "" : "s") +
    " found for your selected support in " +
    stateName +
    ". These are possible matches, not confirmed eligibility.";

  searchInput.value = "";
  filterSelect.value = "all";

  renderResults();
  resultsSection.hidden = false;

  resultsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  showResults();
});

searchInput.addEventListener("input", renderResults);
filterSelect.addEventListener("change", renderResults);

resetButton.addEventListener("click", function () {
  resultsSection.hidden = true;

  document.getElementById("finder").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/*
  Initial state: no results are shown until the farmer submits the form.
  The included records are central scheme examples and are not exhaustive.
*/