const carMakersURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';

export async function getCarMakers() {
  try {
    const data = await fetch(carMakersURL);
    const makers = await data.json();

    return makers;
  } catch (error) {
    console.error('Database Error:', error);

    throw new Error('Failed to fetch data');
  }
}

export async function getCarDetail(makeId: string, year: string) {
  const detailsUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

  try {
    const data = await fetch(detailsUrl);
    const details = await data.json();

    return details;
  } catch (error) {
    console.error('Database Error:', error);

    throw new Error('Failed to fetch data');
  }
}