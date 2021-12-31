// * No Duplicate in array
export function ArrNoDupe(a) {
  var temp = {};
  for (var i = 0; i < a.length; i++) temp[a[i]] = true;
  return Object.keys(temp);
}
