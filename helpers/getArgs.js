const hasSlashString = (value = "") => value.charAt(0) === "-";

const extractFirstSymbol = (value) => value.substring(1);

export const getArgs = (args = []) => {
  const [_executorDir, _programDir, ...restArguments] = args;

  return restArguments.reduce((res, value, index, array) => {
    const nextValue = array[index + 1] ?? null;

    if (!hasSlashString(value)) {
      return res;
    }

    if (nextValue && hasSlashString(nextValue)) {
      res[extractFirstSymbol(value)] = true;
      return res;
    }

    if (nextValue && !hasSlashString(nextValue)) {
      res[extractFirstSymbol(value)] = nextValue;
      return res;
    }

    res[extractFirstSymbol(value)] = true;
    return res;
  }, {});
};
