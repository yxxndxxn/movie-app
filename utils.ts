export const makeImgPath = (img: string, width: string = "w500") =>{
  const url =`https://image.tmdb.org/t/p/${width}${img}`;
  console.log(url);
  return url;
}
