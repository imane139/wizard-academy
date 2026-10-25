type Method = (...args: any[]) => any;


// =====================================
// VALIDATE POWER
// =====================================

export function ValidatePower(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as Method;

  descriptor.value = function (
    this: object,
    ...args: unknown[]
  ) {
    const power = args[0];

    if (
      typeof power !== "number" ||
      !Number.isFinite(power) ||
      power < 0
    ) {
      throw new Error(
        "La puissance doit être un nombre positif ou nul"
      );
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}


// =====================================
// CACHE
// =====================================

export function Cache(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as Method;

  const caches = new WeakMap<
    object,
    Map<string, unknown>
  >();

  descriptor.value = function (
    this: object,
    ...args: unknown[]
  ) {
    let cache = caches.get(this);

    if (!cache) {
      cache = new Map<string, unknown>();
      caches.set(this, cache);
    }

    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Résultat récupéré du cache");
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);

    cache.set(key, result);

    return result;
  };

  return descriptor;
}


// =====================================
// LOG
// =====================================

export function Log(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as Method;

  descriptor.value = function (
    this: object,
    ...args: unknown[]
  ) {
    console.log(
      `[Log] ${propertyKey} called with:`,
      args
    );

    return originalMethod.apply(this, args);
  };

  return descriptor;
}


// =====================================
// MEASURE TIME
// =====================================

export function MeasureTime(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as Method;

  descriptor.value = function (
    this: object,
    ...args: unknown[]
  ) {
    const start = performance.now();

    try {
      return originalMethod.apply(this, args);
    } finally {
      const duration = performance.now() - start;

      console.log(
        `[Time] ${propertyKey}: ${duration.toFixed(3)} ms`
      );
    }
  };

  return descriptor;
}