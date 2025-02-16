function getSeason(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  const start = 4; 
  const end = 10;

  const pickupMonth = pickup.getMonth();
  const dropoffMonth = dropoff.getMonth();

  if (
      (pickupMonth >= start && pickupMonth <= end) ||
      (dropoffMonth >= start && dropoffMonth <= end) ||
      (pickupMonth < start && dropoffMonth > end)
  ) {
      return "High";
  } else {
      return "Low";
  }
}

function getDays(pickupDate, dropoffDate) {
  const dayMs = 24 * 60 * 60 * 1000;
  const firstDate = new Date(pickupDate);
  const secondDate = new Date(dropoffDate);

	if (firstDate.getTime() > secondDate.getTime() || firstDate.getTime() < new Date().setHours(1, 59, 0) ) {
		return null;
	}

  return Math.round(Math.abs((firstDate - secondDate) / dayMs)) + 1;
}

function price(pickupDate, dropoffDate, type, age) {
  const days = getDays(pickupDate, dropoffDate);
  const season = getSeason(pickupDate, dropoffDate);

  if (age < 18) {
      return "Driver too young - cannot quote the price";
  }

	if (days == null) {
		return "Invalid date"
	}

  if (age <= 21 && type !== "Compact") {
      return "Drivers 21 y/o or less can only rent Compact vehicles";
  }

  let rentalprice = age;

	if (type === "Racer" && age <= 25 && season === "High") {
		rentalprice *= 1.5;
	}

  if (season === "High" ) {
    rentalprice *= 1.15;
  }

  if (days > 10 && season === "Low" ) {
      rentalprice *= 0.9;
  }

  return `$${rentalprice.toFixed(2)}`;
}

exports.price = price;
