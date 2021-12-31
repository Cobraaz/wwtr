export const parametersArray = [
  {
    index: 1,
    warning:
      "Score based on the requirements for permitting the new effluent discharge.",
    type: "Existing Permit Consideration",
    category: "permit consideration",
    score: [
      "Relatively lowest permit modification",
      "Relatively lower permit modification",
      "Relatively higher permit modifications required",
      "Relatively highest, major permit modification required or new permit",
    ],
  },
  {
    index: 2,
    warning:
      "Score based on the delays associated with permitting the new effluent discharge.",
    type: "Delays due to Permitting",
    category: "permit consideration",
    score: [
      "Relatively lowest delays, - less than 3 months",
      "Relatively lower delays 3 months to 6 months",
      "Relatively higher delays, more than 6 months",
      "Relatively highest delays,  more than1 year",
    ],
  },
  {
    index: 3,
    warning:
      "Score based on ability to meet generate effluent of sufficient quality to meet regulator requirements across parameters. Effluent requirements may vary based on discharge scenario (e.g. SEPA, Scottish Water, emission to air, pretreatment for off-site management, others).",
    type: "Effluent Quality",
    category: "design",
    score: [
      "Highest effluent quality. Surpasses lowest limits for all parameters from all regulators.",
      "High effluent quality. Meets lowest limits for all parameters from all regulators.",
      "Moderate effluent quality. May not meet limits for most challenging parameters from most stringent regulators.",
      "Lower effluent quality. May not effectively treat one or more parameters.",
    ],
  },
  {
    index: 4,
    warning:
      "Score based on other facilities successfully treading similar wastewater (i.e., from pharmaceuticals manufacturing). Design is a standard practice as compared with a new method. Best available technique.",
    type: "Proven Application",
    category: "design",
    score: [
      "Relatively highest, very commonly applied strategy.",
      "Relatively higher, commonly applied strategy.",
      "Relatively lower, less commonly applied strategy.",
      "Relatively lowest, novel approach.",
    ],
  },
  {
    index: 5,
    warning:
      "Score based on the requirements for modifying the existing collection system to implement new treatment.",
    type: "Collection System Modification",
    category: "design",
    score: [
      "Relatively lowest collection system modification, Existing collection system may require minor repairs and/or existing collection system has adequate capacity.",
      "Relatively lower collection system modification, Existing collection system may require small repairs and/or existing collection system has adequate capacity.",
      "Relatively high collection system modification, existing collection system requires some repairs and modification.",
      "Relatively highest collection system modification, Existing collection system requires significant repairs and/or Existing collection system lacks capacity without major modifications.",
    ],
  },
  {
    index: 6,
    warning:
      "Score based on the requirements for modifying the existing electrical system to implement new treatment.",
    type: "Electrical System Modification",
    category: "design",
    score: [
      "Relatively lowest electrical changes.  Existing electrical is functional and adequate.",
      "Relatively lower electrical changes.  Existing electrical is functional and mostly adequate. ",
      "Relatively higher electrical changes.  Existing electrical system may require repair and/or existing electrical system has capacity issues.",
      "Relatively highest electrical changes.  Existing electrical system requires repairs and/or existing electrical system lacks capacity without major modifications.",
    ],
  },
  {
    index: 7,
    warning:
      "Score based on the requirements for modifying the existing natural gas system to implement new treatment.",
    type: "Natural Gas System Modification",
    category: "design",
    score: [
      "Relatively lowest gas system changes.  Existing natural gas system is functional and adequate.",
      "Relatively lower gas system changes.  Existing natural gas system is mostly functional and adequate.",
      "Relatively high gas system changes.  Existing natural gas system may require repair and/or existing natural gas system has limited capacity.",
      "Relatively highest gas system changes.  Existing natural gas system requires repairs and/or existing natural gas system lacks capacity without major modifications.",
    ],
  },
  {
    index: 8,
    warning:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    type: "Water System Modification",
    category: "design",
    score: [
      "Relatively lowest  potable water system changes.  Existing potable water system is functional and adequate.",
      "Relatively lower  potable water system changes.  Existing potable water system is mostly functional and adequate.",
      "Relatively higher  potable water system changes.  Existing potable water system may require repair and/or existing potable water system has some capacity issues.",
      "Relatively highest  potable water system changes.  Existing potable water system requires repairs and/or existing potable water system lacks capacity without major modifications.",
    ],
  },
  {
    index: 9,
    warning:
      "Score based on the requirements for modifying the existing treatment system to implement new treatment.",
    type: "Treatment System Modification",
    category: "design",
    score: [
      "Relatively lowest treatment system changes. Existing treatment is functional.",
      "Relatively lower treatment system changes. Existing treatment is mostly functional. ",
      "Relatively higher treatment system changes. Existing treatment system may require repair and/or existing treatment system needs some modifications.",
      "Relatively highest treatment system changes. Existing treatment system requires significant repairs and/or existing treatment system lacks capacity without major modifications.",
    ],
  },
  {
    index: 10,
    warning:
      "Score based on the requirements for modifying the existing controls system to implement new treatment.",
    type: "Controls Complexity and Modifications",
    category: "design",
    score: [
      "Relatively lowest control needs. Simple Controls.",
      "Relatively lower control needs. Basic Controls.",
      "Relatively higher control needs. Moderate Controls.",
      "Relatively highest control needs. Complex Controls.",
    ],
  },
  {
    index: 11,
    warning:
      "Score based on the complexity of the selected treatment technology.  A higher score is more simple.",
    type: "Treatment Complexity",
    category: "design",
    score: [
      "Relativity simplest technology with little to no moving parts and only minor amount of support equipment.",
      "Relativity simpler technology with little to no moving parts and only small amount of support equipment.",
      "Relatively  complex technology that may contain some moving parts and ancillary support equipment.",
      "Relativity most complex technology that may contain many moving parts and may require multiple supporting pieces of equipment.",
    ],
  },
  {
    index: 12,
    warning:
      "Score based on the amount, nature and ease of disposal of residual waste production from  selected treatment technology.",
    type: "Liquid and Solid Waste Residuals",
    category: "design",
    score: [
      "Relatively lowest waste disposal/hauling changes.Waste residuals are of a manageable volume and are characteristically similar to existing waste residuals.",
      "Relatively lower waste disposal / hauling changes.Waste residuals are of a manageable volume and are mostly similar to existing waste residuals.  Small permit disposal changes may be required.",
      "Relatively higher waste disposal / hauling changes.Waste residuals are of a higher volume and are similar to existing waste residuals.  Some permit disposal changes may be required.   Some changes to existing disposal/hauling procedures may be required.",
      "Relatively highest waste disposal / hauling changes.Waste residuals are of a higher volume and/or may require special permitting for disposal.   Existing disposal / hauling procedures cannot be used without major modifications.",
    ],
  },
  {
    index: 13,
    warning:
      "score based on amount of plant surface area / building space required to implement strategy.",
    type: "Space Requirements",
    category: "design",
    score: [
      "Relatively lowest, minimal / compact physical infrastructure.",
      "Relatively lower, compact physical infrastructure.",
      "Relatively higher, significant physical infrastructure.",
      "Relatively highest, significant physical infrastructure with long residence times.",
    ],
  },
  {
    index: 14,
    warning:
      "Score based on the level of engineering work required to implement project.",
    type: "Engineering Complexity",
    category: "design",
    score: [
      "Relatively simplest bid package; experienced contractors identified by Owner",
      "Relatively simpler bid package;  for unidentified/unknown contractors ",
      "Relatively complex bid package; and/or construction bid package developed for unidentified/unknown contractors",
      "Relatively most complex bid package; specialized contractor needed",
    ],
  },
  {
    index: 15,
    warning: "Score based on potential costs of necessary equipment.",
    type: "Capital Costs",
    category: "design",
    score: [
      "Relatively lowest, minimal investment.",
      "Relatively lower, relatively smaller investment.",
      "Relatively higher, significant investment.",
      "Relatively highest, significant investment.",
    ],
  },
  {
    index: 16,
    warning:
      "Score based on level of effort required to transport, construct, and  set up equipment on-site.",
    type: "Constructability",
    category: "implementation",
    score: [
      "Relatively easiest. Modular equipment, few specialized tasks / labor requirements.",
      "Relatively easier. Small equipment or on-site assembly, few specialized tasks / labor requirements.",
      "Relatively more challenging. Bulky equipment, specialized tasks / labor requirements.",
      "Relatively most challenging. Large, hard-to-transport infrastructure, many specialized tasks / labor requirements.",
    ],
  },
  {
    index: 17,
    warning: "Score based on challenges associated with location.",
    type: "Location Constraints",
    category: "implementation",
    score: [
      "Relatively lowest supply issues. Location is near city and/or major transportation.  Material and labor resources are available. No Travel or Delivery Restrictions Anticipated",
      "Relatively lower supply issues. Location is accessible to city and/or major transportation.  Material and labor resources are mostly available. Minor Travel or Delivery Restrictions Anticipated",
      "Relatively higher supply issues.. Location may be more remote or less accessible.  Some material and/or labor resources may be a challenge. No travel and/or delivery restriction anticipated.",
      "Relatively highest supply issues..  Location may remote and/or have restricted access.  Some materials and/or labor resources may not be available. Travel and/or delivery restrictions are anticipated.",
    ],
  },
  {
    index: 18,
    warning:
      "Score based on potential interruptions in existing waste and production operations.",
    type: "Disruption to Operations",
    category: "implementation",
    score: [
      "Relatively shortest timeline. Minimal assembly and construction time. Minimal disruption to existing waste operations. No disruption to production.",
      "Relatively shorter timeline. Limited disruption to existing waste operations. No disruption to production.",
      "Relatively longer timeline. Some disruption to existing operations. Short / intermittent disruption to production.",
      "Relatively longest timeline. Extensive disruption to existing operations. Extended / continuous disruption to production.",
    ],
  },
  {
    index: 19,
    warning:
      "Score based on potential hazards and/or safety concerns that may impact project",
    type: "Hazards / Safety",
    category: "implementation",
    score: [
      "Relatively lowest Hazards/Safety Concerns. Standard Health and Safety Plan and Procedures is unchanged.",
      "Relatively lower  Hazards/Safety Concerns. Standard Health and Safety Plan and Procedures can be implemented.",
      "Relatively higher Health/Safety Concerns. Additional Hazards and Safety procedures are required, but can be addressed by Health and Safety Plan and Procedures.",
      "Relatively highest  level of safety concerns will be implemented requiring higher levels of PPE and detailed Health and Safety Plan.",
    ],
  },
  {
    index: 20,
    warning:
      "Score based on potential challenges with both construction waste disposal",
    type: "Waste Disposal",
    category: "implementation",
    score: [
      "Construction waste  can be disposed of at a local C&D landfill.",
      "Relatively lower disposal considerations. Most Construction waste can be disposed of at a local C&D landfill, with a few exceptions",
      "Relatively higher disposal considerations. Some construction waste can be disposed of at a local C&D landfill.  Some Construction waste needs to be characterized and disposed of as Special Waste.",
      "Relatively highest disposal considerations. A large fraction of the construction waste cannot be disposed of at a local C&D landfill.  Some construction waste needs to be characterized and disposal of as Special Waste. Some construction waste needs to be supposed of as hazardous waste.",
    ],
  },
  {
    index: 21,
    warning:
      "Score based on potential delays associated with equipment procurement",
    type: "Equipment Procurement",
    category: "implementation",
    score: [
      "Equipment is available and can delivered onsite in less than 1 month.",
      "Relatively faster delivery. Equipment is available and can delivered onsite in less than 3 months.",
      "Relatively slower delivery. Equipment is not readily available and will take 4 to 8 months for delivery",
      "Relatively slowest delivery. Equipment requires long lead time (greater than 9 months)",
    ],
  },
  {
    index: 22,
    warning:
      "Ranking based on level of effort required to operate equipment (e.g., automation, control variables, number of operators).",
    type: "Ease of Operation",
    category: "operation",
    score: [
      "Relatively easiest to operate. High level of passive control, few control variables, high level of automation. Lowest level of operator attention. <1 FTE operators.",
      "Relatively easier to operate. Moderate level of passive control, few control variables, moderate level of automation. Lower level of operator attention. 1-2 FTE operators.",
      "Relatively harder to operate. Several control variables, moderate level of automation. Moderate level of operator attention. 3-5 FTE operators.",
      "Relatively hardest to operate. Many control variables, low level of automation. Highest level of operator attention. >5 FTE operators.",
    ],
  },
  {
    index: 23,
    warning:
      "Ranking based on level of skill and labor effort required to perform routine maintenance.",
    type: "Ease of Maintenance",
    category: "operation",
    score: [
      "Relatively easiest to maintain. Minimal specialized operator skill required for routine maintenance.",
      "Relatively easier to maintain. Some specialized operator skill required for routine maintenance.",
      "Relatively harder to maintain. Significant specialized skill required for routine maintenance.",
      "Relatively hardest to maintain. Highly specialized skill or major effort required for routine maintenance.",
    ],
  },
  {
    index: 24,
    warning:
      "Score based on potential hazards and/or safety concerns that may impact operations",
    type: "Hazards / Safety",
    category: "operation",
    score: [
      "Relatively lowest Hazards/Safety Concerns. Standard Health and Safety Plan and Procedures is unchanged.",
      "Relatively lower  Hazards/Safety Concerns. Standard Health and Safety Plan and Procedures can be implemented.",
      "Relatively higher Health/Safety Concerns. Additional Hazards and Safety procedures are required, but can be addressed by Health and Safety Plan and Procedures.",
      "Relatively highest  level of safety concerns will be implemented requiring higher levels of PPE and detailed Health and Safety Plan.",
    ],
  },
  {
    index: 25,
    warning:
      "Ranking based on amount of energy required to operate treatment system and associated equipment.",
    type: "Power Demand",
    category: "operation",
    score: [
      "Relatively lowest utility demand. Lowest amount of power required and lowest cost.",
      "Relatively lower utility demand. Moderate amount of power required, relatively lower costs.",
      "Relatively higher utility demand. Significant amount of power required, higher costs",
      "Relatively highest utility demand. Highest level of power required, highest costs",
    ],
  },
  {
    index: 26,
    warning:
      "Ranking based on amount of chemicals required for treatment, associated costs, and potential hazards.",
    type: "Chemical Demand",
    category: "operation",
    score: [
      "Relatively lowest chemical demand. Fewest chemicals required to treat wastewater, lowest cost. Safest chemicals, minimal hazard.",
      "Relatively lower chemical demand. Moderate amount of chemicals required to treat wastewater, relatively smaller costs. Safer chemicals, minimal hazards.",
      "Relatively higher chemical demand. Significant amount of chemicals required to treat wastewater, higher costs. Hazardous chemicals, some associated hazards.",
      "Relatively highest chemical demand. Highest amount of chemicals required to treat wastewater, highest costs. Hazardous chemicals, many associated hazards.",
    ],
  },
  {
    index: 27,
    warning: "Ranking based on quantity, composition, and ease of disposal.",
    type: "Disposal of Residuals",
    category: "operation",
    score: [
      "Relatively easiest to dispose. Least amount of residuals, least level of effort required for disposal.",
      "Relatively easier to dispose. Moderate amount of residuals, moderate amount of effort required for disposal",
      "Relatively difficult to dispose. Significant amount of residuals, significant amount of effort required for disposal.",
      "Relatively hardest to dispose. Most amount of residuals, most amount of effort required for disposal.",
    ],
  },
  {
    index: 28,
    warning:
      "Ranking based on ability of system to manage and treat other wastes.",
    type: "Ability of maintain other wastes",
    category: "operation",
    score: [
      "Relatively best ability to manage other wastes with no changes in operation of treatment system. Able to treat all other wastes, all of the time. ",
      "Relatively higher ability to manage other wastes with no changes in operation of treatment system. Able to treat most other wastes, most of the time.",
      "Relatively lower ability to manage other wastes with no changes in operation of treatment system. Able to treat some other wastes, some of the time. ",
      "Relatively lowest ability to manage other wastes with no changes in operation of treatment system. Able to treat fewest other wastes, some of the time. ",
    ],
  },
  {
    index: 29,
    warning:
      "Ranking based on potential for nuisance odor and impact on public perception.",
    type: "Potential for Odor",
    category: "operation",
    score: [
      "No associated odors at any time. No potential to impact community, no impact on public perception.",
      "Relatively mild associated odors, some of the time. Small potential to impact community, little impact on  public perception.",
      "Relatively bad associated odors, some of the time. Higher potential to impact community, some bad public perception.",
      "Relatively foul associated odors, all of the time. Highest potential to impact community, bad public perception.",
    ],
  },
  {
    index: 30,
    warning:
      "Ranking based on potential for nuisance odor and impact on public perception.",
    type: "Potential for Noise",
    category: "community",
    score: [
      "No associated noises at any time. No potential to impact community, no impact on public perception.",
      "Relatively mild associated noises, some of the time. Small potential to impact community, little impact on  public perception.",
      "Relatively loud associated noises, some of the time. Higher potential to impact community, some bad public perception.",
      "Relatively very loud associated noises, all of the time. Highest potential to impact community, bad public perception.",
    ],
  },
  {
    index: 31,
    warning:
      "Ranking based on potential for nuisance odor and impact on public perception.",
    type: "Potential for Visual Impact",
    category: "community",
    score: [
      "No associated visuals at any time. No potential to impact community, no impact on public perception.",
      "Relatively mild associated visuals, some of the time. Small potential to impact community, little impact on  public perception.",
      "Relatively bad associated visuals, some of the time. Higher potential to impact community, some bad public perception.",
      "Relatively large bad associated visuals, all of the time. Highest potential to impact community, bad public perception.",
    ],
  },
  {
    index: 32,
    warning:
      "Ranking based on potential for nuisance residual waste and impact on public perception.",
    type: "Potential for Residuals Disposal",
    category: "community",
    score: [
      "No bad association with residual wastes. No potential to impact community, No impact on  public perception.",
      "Relatively mild association with residual wastes, some of the time. Small potential to impact community, little impact on  public perception.",
      "Relatively bad association with residual wastes, some of the time. Higher potential to impact community, some bad public perception.",
      "Relatively large bad association with residual waste, all of the time. Highest potential to impact community, bad public perception.",
    ],
  },
];
