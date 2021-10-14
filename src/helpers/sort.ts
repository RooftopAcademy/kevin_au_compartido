import { IProduct } from "../types/products"
import { IMappedProducts, ISelectValues, sortParamsType } from "../types/sort"

export const Products = (listOfProducts: IProduct[]): IMappedProducts => {

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

  const mapProductsByCategory = () => {

    const categorys: string[] = []

    listOfProducts.forEach(product => {
      if(!categorys.includes(product.category)) categorys.push(product.category)
    })

    categorys.forEach(category => {
      mappedProductsByCategory.set(category, listOfProducts.filter(product => product.category === category))
    })

    // add products under 1000$
    const productsUnder1000 = listOfProducts.filter(p => +p.price <= 1000)
    mappedProductsByCategory.set('Under 1000$' , productsUnder1000)

    return mappedProductsByCategory
  }

  const sortBySelect = (arr: IProduct[], type: string) => {
    const selectValuesUI: ISelectValues = {
      'price_asc' : () => arr.sort((a, b) => +a.price - +b.price),
      'price_desc' : () => arr.sort((a, b) => +b.price - +a.price),
      'name_asc' : () => arr.sort((a, b) => a.name.localeCompare(b.name)),
      'name_desc' : () => arr.sort((a, b) => b.name.localeCompare(a.name))
    }
    return selectValuesUI[type]()
  }

  mapProductsByCategory()

  return {
    get: () => listOfProducts,
    getMappedProductsByKey: (params:sortParamsType) => getMappedProductsByKey(params),
    getProductsByCategory: (category) => category === 'All' ? listOfProducts : mappedProductsByCategory.get(category) as IProduct[],
    getCategoryList: () => Array.from(mappedProductsByCategory.keys()).filter(c => c !== 'Under 1000$') as string[],
    sort: (products, type) => sortBySelect(products, type)
  }
}
