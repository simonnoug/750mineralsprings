export const formatted = (id: number): string => {
   return id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
}

export default formatted
