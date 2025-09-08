/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_flatten
 * https://github.com/you-dont-need-x/you-dont-need-lodash
 */

// ----------------------------------------------------------------------

export function flattenArray(list, key = "children") {
  let children = [];

  const flatten = list?.map((item) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(
    children.length ? flattenArray(children, key) : children
  );
}

// ----------------------------------------------------------------------

export function flattenDeep(array) {
  const isArray = array && Array.isArray(array);

  if (isArray) {
    return array.flat(Infinity);
  }
  return [];
}

// ----------------------------------------------------------------------

export function orderBy(array, properties, orders) {
  return array.slice().sort((a, b) => {
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      const order = orders && orders[i] === "desc" ? -1 : 1;

      const aValue = a[property];
      const bValue = b[property];

      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
}

// ----------------------------------------------------------------------

export function keyBy(array, key) {
  return (array || []).reduce((result, item) => {
    const keyValue = key ? item[key] : item;

    return { ...result, [String(keyValue)]: item };
  }, {});
}

// ----------------------------------------------------------------------

export function sumBy(array, iteratee) {
  return array.reduce((sum, item) => sum + iteratee(item), 0);
}

// ----------------------------------------------------------------------

export function isEqual(a, b) {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (
    typeof a === "string" ||
    typeof a === "number" ||
    typeof a === "boolean"
  ) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => isEqual(a[key], b[key]));
  }

  return false;
}

// ----------------------------------------------------------------------

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const merge = (target, ...sources) => {
  if (!sources.length) return target;

  const source = sources.shift();

   
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      merge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return merge(target, ...sources);
};

// ----------------------------------------------------------------------

export const formatName = (name) => {
  return name
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\(([^)]+)\)/g, (match, p1) => {
      // Capitalize each letter inside parentheses (a+b+c)
      return `(${p1
        .split("+")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("+")})`;
    })
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word's first letter
    .join(" "); // Join the words back together
};

// ----------------------------------------------------------------------

export const formatNameToUpperCase = (name) => {
  return name
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\(([^)]+)\)/g, (match, p1) => {
      // Convert everything inside parentheses to uppercase
      return `(${p1.toUpperCase()})`;
    })
    .toUpperCase(); // Convert the entire string to uppercase
};

// ----------------------------------------------------------------------

export const formatColumnName = (col) => col.toLowerCase().replace(/\s+/g, "_");

// ----------------------------------------------------------------------

export const formatDecimalNumber = (num, digit) => {
  num = Number(num); // Convert string to number

  if (isNaN(num)) return "-";

  // if (num < 0) return num; // Return negative numbers as they are

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digit || 5,
  }).format(num);
};

// ----------------------------------------------------------------------

export const formatCompactNumber = (num) => {
  num = Number(num); // Convert string to number

  if (isNaN(num)) return "-"; // Handle invalid numbers

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M"; // Convert to millions
  } else if (absNum >= 1_000) {
    return (num / 1_000).toFixed(2) + "K"; // Convert to thousands
  }

  return num.toFixed(2); // Return numbers below 1K with 2 decimal places
};

// ----------------------------------------------------------------------

export const maskEmail = (email) => {
  if (!email) return "*****@*****.com";
  const [name, domain] = email.split("@");
  return `${name.slice(0, 3)}*****@${domain}`;
};

// ----------------------------------------------------------------------
export const getColorCode = (riseFallColor, direction) => {
  if (riseFallColor.title === "Green_Up") {
    return direction === "UP" ? riseFallColor.up : riseFallColor.down;
  } else if (riseFallColor.title === "Red_Up") {
    return direction === "UP" ? riseFallColor.up : riseFallColor.down;
  } else if (riseFallColor.title === "Blue_Down") {
    return direction === "UP" ? riseFallColor.up : riseFallColor.down;
  } else {
    return ""; // fallback
  }
};
