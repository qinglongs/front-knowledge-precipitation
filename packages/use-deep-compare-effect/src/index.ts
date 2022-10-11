import React, { useEffect } from "react";
import useDeepComparison from "use-deep-comparison";

/**
 * @method 深比较副作用hooks
 */
const useDeepComparisonEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList
) => {
  if (!Array.isArray(deps)) throw Error("deps has to be an array");
  if (!effect || typeof effect !== "function")
    throw Error("effect has to be a function");

  const data = useDeepComparison<React.DependencyList>(deps, []) as any[];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, data);
};

export default useDeepComparisonEffect;
