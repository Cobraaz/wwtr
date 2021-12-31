import namor from "namor";
// export const fakeProductsData = [
//   {
//     fullname: namor.generate({ words: 2 }),
//     email: this.fullname.replace(/ /g, "") + "@gmail.com",
//     company_name: "ramboll",
//     job_profile: "trainee developer",
//     password: "1234567",
//   },
// ];
const array = [];
for (let i = 0; i < 1000; i++) {
  const namer = namor.generate({ words: 2, saltLength: 0 }).replace(/-/g, " ");
  array.push({
    fullname: namer,
    email: namer.replace(/ /g, "") + "@gmail.com",
    company_name: "ramboll",
    job_profile: "trainee developer",
    password: "1234567",
  });
}

export default array;
