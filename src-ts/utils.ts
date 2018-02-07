const compileNameAndData = function(vm, text) {
  const nameArr = text.trim().split('.')
  let data = vm._data
  let name
  for (let i = 0;i < nameArr.length;i++) {
    name = nameArr[i]
    if (i > 0) data = data[nameArr[i - 1]]
  }
  return {
    data: data,
    name: name
  }
}

export { compileNameAndData }