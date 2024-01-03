// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to find nearby coordinates within 10km radius
export default function findNearbyCoordinates(
  isLoading,
  targetLat,
  targetLon,
  allCoordinates
) {
  const nearbyCoordinates = [];
  console.log("allCoordinates", allCoordinates);
  !isLoading &&
    allCoordinates.forEach((coord) => {
      // Do not include any accommodations that has the same coordinates as the festival
      
      const distance = calculateDistance(
        targetLat,
        targetLon,
        targetLat !== coord.latitude && coord.latitude,
        targetLon !== coord.longitude && coord.longitude
      );
      if (distance <= 10) {
        // Check if the distance is within 10km (adjust as needed)
        nearbyCoordinates.push(coord);
      }
    });

  return nearbyCoordinates;
}
