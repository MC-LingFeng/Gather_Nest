import { RouteType } from '../../route/type';

const formatPath = (res: Array<RouteType>) => {
  const fatherItem = res.filter((item) => item.father_path === null);

  return fatherItem.map((item) => {
    const children = res.filter((child) => item.path === child.father_path);

    return {
      ...item,
      user: undefined,
      grade: undefined,
      children: children.map((child) => ({
        ...child,
        user: undefined,
        grade: undefined,
      })),
    };
  });
};

export default formatPath;
