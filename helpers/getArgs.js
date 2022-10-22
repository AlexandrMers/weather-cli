const hasSlashString = (value = "") => value.charAt(0) === "-";

const cutFirstSymbol = (value) => value.substring(1);

export const getArgs = (args = []) => {
  const [_executorDir, _programDir, ...restArguments] = args;

  return restArguments.reduce((res, value, index, array) => {
    const nextValue = array[index + 1] ?? null;

    if (!hasSlashString(value)) {
      return res;
    }

    if (nextValue && hasSlashString(nextValue)) {
      res[cutFirstSymbol(value)] = true;
      return res;
    }

    if (nextValue && !hasSlashString(nextValue)) {
      res[cutFirstSymbol(value)] = nextValue;
      return res;
    }

    res[cutFirstSymbol(value)] = true;
    return res;
  }, {});
};
