import { shoes as productData } from "../data/data";


export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productData);
    }, 600);
  });
};
