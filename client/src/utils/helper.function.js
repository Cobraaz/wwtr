// * Moment Library
// * For Data Foramting
import moment from "moment";
export const formatDate = (date, dateFormat = "LL") =>
  date && moment(date).format(dateFormat);

// * Capitalize First Letter Of Each Word
export const capitalize = (input) => {
  let words = input.split(" ");
  let CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
};

// * Category For Array Element
export const categoryArrayElement = [
  { categoryName: "permit consideration", name: "Permitting" },
  { categoryName: "design", name: "Design" },
  { categoryName: "implementation", name: "Implementation" },
  { categoryName: "operation", name: "Operation" },
  { categoryName: "community", name: "Community" },
];
