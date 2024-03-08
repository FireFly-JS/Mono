export function validateRequired(value: any): boolean {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return false;
  }
  return true;
}


export const getErrorMessage = (error: any): string => {
  const errors = Object.values(error)
  const err = errors?.[0] as any
  if (typeof err === 'object') {
    const keys = Object.keys(err)
    console.log(keys)
    if (keys.length === 2 && keys.includes('name') && keys.includes('message')) {
      return err.message
    }
    return getErrorMessage(errors?.[0])
  }
  return 'Unknown error'
}

export const formatOutputValidate = (value: any, error: any) => {
  if (Object.keys(error).length > 0) {
    return {
      status: "error",
      error,
    }
  }
  return {
    status: "success",
    data: value,
  }
}