const calculateTotal = async (court, startTime, endTime, resources, rules) => {
  let total = 0;
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  // 1. Calculate Duration in Hours
  const durationInHours = (end - start) / (1000 * 60 * 60);
  
  // 2. Base Price Calculation
  let basePrice = court.basePricePerHour * durationInHours;
  total += basePrice;

  // 3. Apply Pricing Rules
  // Check Day (0 = Sunday, 6 = Saturday)
  const day = start.getDay();
  const startHour = start.getHours();

  let peakHourSurge = 0;

  rules.forEach(rule => {
    // Weekend Rule
    if (rule.type === 'weekend' && (day === 0 || day === 6)) {
      total += rule.additionalAmount;
    }

    // Peak Hour Rule (Example: 18:00 to 21:00)
    if (rule.type === 'peak_hour') {
      const ruleStart = parseInt(rule.startTime.split(':')[0]);
      const ruleEnd = parseInt(rule.endTime.split(':')[0]);

      // Simple check: If booking starts during peak hours
      if (startHour >= ruleStart && startHour < ruleEnd) {
        const surge = (basePrice * rule.multiplier) - basePrice;
        peakHourSurge += surge;
        total += surge;
      }
    }
  });

  // 4. Resource Costs (Coach + Equipment)
  let coachFee = 0;
  let equipmentFee = 0;

  if (resources.coach) {
    coachFee = resources.coach.hourlyRate * durationInHours;
    total += coachFee;
  }

  // Example: 50 Rs per racket
  if (resources.racketsNeeded > 0) {
    equipmentFee = resources.racketsNeeded * 50; 
    total += equipmentFee;
  }

  return {
    total,
    breakdown: {
      basePrice,
      peakHourSurge,
      coachFee,
      equipmentFee
    }
  };
};

module.exports = calculateTotal;