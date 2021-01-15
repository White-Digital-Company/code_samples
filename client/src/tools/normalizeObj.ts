const normalizeObj = <T>(arr: T[], key?: keyof T): Record<string, T> =>
  arr.reduce(
    (acc, obj) => ({
      ...acc,
      // @ts-ignore
      [obj[key || 'id']]: obj,
    }),
    {},
  ) as Record<string, T>

export default normalizeObj
