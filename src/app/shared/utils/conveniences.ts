export const queryToModelOptions = (doc: any) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data
  };
};
