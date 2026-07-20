export function useRandomNumber() {
  const getRandomWithRange = (min: number, max: number): number => {
    const floorMin = Math.floor(min);
    const ceilMax = Math.ceil(max);

    return Math.floor(Math.random() * (ceilMax - floorMin + 1)) + floorMin;
  };

  return { getRandomWithRange };
}
