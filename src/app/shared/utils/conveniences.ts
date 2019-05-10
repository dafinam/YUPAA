export const queryToModelOptions = (doc: any) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data
  };
};

export const appendZeroPrefix = (time: number) => {
  return time < 10 ? `0${time}` : time.toString();
};

export const dayOfWeekIdxToStr = (day: number) => {
  switch (day) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thur";
    case 5:
      return "fri";
    case 6:
      return "sat";
    default:
      break;
  }
};
