//Implement a function to compare two strings and returns true if they are similar
export function useSearch() {
  function search(term: string, target: string) {
    term = term.toLowerCase();
    target = target.toLowerCase();
    let max = 0;
    const matrix = new Array(term.length)
      .fill(0)
      .map(() => new Array(target.length).fill(0));

    for (let i = 0; i < term.length; i++) {
      for (let j = 0; j < target.length; j++) {
        if (i === 0 || j === 0) {
          if (term[i] === target[j]) matrix[i][j] = 1;
        } else {
          if (term[i] === target[j]) matrix[i][j] = matrix[i - 1][j - 1] + 1;
          if (matrix[i][j] > max) max = matrix[i][j];
        }
      }
    }
    return max >= 3;
  }
  return search;
}
