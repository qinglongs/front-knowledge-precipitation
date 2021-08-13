/**
 * @method 深比较变量，监听变化并返回新的变量
 * @returns  返回的深比较处理过后的数据
 */
declare function useDeepComparison<T>(val: T, defaultValue?: any): T;
export default useDeepComparison;
