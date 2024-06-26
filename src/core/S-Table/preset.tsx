import helper from '@/helper'

export const tableResponserDefiner = {
  interceptor: (response: any) => {
    if (helper.isObject(response)) {
      if (helper.isObject(response.result)) {
        const data = helper.isArray(response.result.data) ? response.result.data : []
        const pageNo = (response.result.pageNo || 1) as number
        const totalSize = (response.result.totalSize || 0) as number

        return {
          data,
          pageNo,
          totalSize,
        }
      }

      if (helper.isArray(response.result)) {
        const data = response.result
        const pageNo = 1
        const totalSize = data.length

        return {
          data,
          pageNo,
          totalSize,
        }
      }
    }

    if (helper.isArray(response)) {
      const data = response
      const pageNo = 1
      const totalSize = data.length

      return {
        data,
        pageNo,
        totalSize,
      }
    }

    return {
      data: [],
      pageNo: 1,
      totalSize: 0,
    }
  },
}

export default tableResponserDefiner
