export function ValidatePower(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]) {
      const power = args[0];
  
      if (power < 0) {
        throw new Error("La puissance ne peut pas être négative");
      }
  
      return originalMethod.apply(this, args);
    };
  
    return descriptor;
  }

  export function Cache(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();
  
    descriptor.value = function (...args: any[]) {
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