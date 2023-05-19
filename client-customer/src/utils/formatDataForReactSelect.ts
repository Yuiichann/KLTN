function formatDataForReactSelect(data?: any[]) {
  if (!data || data.length === 0) {
    return [];
  }

  const result = data.map((item) => {
    return {
      label: item.name,
      value: item.code,
    };
  });

  return result;
}

export default formatDataForReactSelect;
