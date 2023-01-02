export function shuffle(list: Array<unknown>, rng?: () => number) {
  const random = rng ?? Math.random;
  const nextList = [...list];
  let currentIndex = nextList.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;

    [nextList[currentIndex], nextList[randomIndex]] = [
      nextList[randomIndex], nextList[currentIndex]];
  }

  return nextList;
}

export function range(start: number, end: number): number[] {
  return Array(end - start).fill(start).map((value, index) => value + index);
}
