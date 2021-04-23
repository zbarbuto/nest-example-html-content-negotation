const VIEW_KEY = '__viewAs__';

export function ViewAs(template) {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(VIEW_KEY, template, descriptor.value);
    return descriptor;
  };
}

export function reflectViewAsTemplate(
  callback: (...args: unknown[]) => unknown,
) {
  return Reflect.getMetadata(VIEW_KEY, callback);
}
