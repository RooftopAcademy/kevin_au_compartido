import { IProduct } from "../types/products"
import { sortParamsType } from "../types/sort"

export const Products = (listOfProducts: IProduct[]) => {

  const mappedProductsByKey: Map<string, IProduct[]> = new Map()
  const mappedProductsByCategory: Map<string, IProduct[]> = new Map()

  const sortByKey = ({arr = [], key = 'id', dir = 1} : {arr: IProduct[], key: string, dir: number}) => {
    const sortedArr: IProduct[] = [...arr]
    
    sortedArr.sort((a , b) => {

      function sortOrder() {
        const value1 = a[key]
        const value2 = b[key]

        if(value1 && value2){
          if(value1 > value2) return 1
          if(value1 < value2) return -1
        }
        
        return 0
      }

      return dir === 1
        ? sortOrder() 
        : sortOrder() * -1  
    })
    
    return sortedArr
  }

  const getMappedProductsByKey = (params: sortParamsType) => {

    if(listOfProducts.length > 0) {
      Object.keys(params).forEach(key => {
          const arrByKey = sortByKey({arr: listOfProducts, key, dir: params[key]})
          mappedProductsByKey.set(key, arrByKey)
      })
    }
    
    return mappedProductsByKey
  }

  const getMappedProductsByCategory = () => {

    const categorys: string[] = []

    listOfProducts.forEach(product => {
      if(!categorys.includes(product.category)) categorys.push(product.category)
    })

    categorys.forEach(category => {
      mappedProductsByCategory.set(category, listOfProducts.filter(product => product.category === category))
    })

    return mappedProductsByCategory
  }

  return {
    products: {
      get: () => listOfProducts,
      getMappedProductsByKey: (params:sortParamsType) => getMappedProductsByKey(params),
      getMappedProductsByCategory
    }
  }
}
