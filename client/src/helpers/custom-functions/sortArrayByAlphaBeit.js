const sortArrayByAlphaBeit = (array) => {
    array.sort((a, b) => {
        return `${a.data.firstname}${a.data.lastname}` >
          `${b.data.firstname}${b.data.lastname}`
          ? 1
          : -1;
      })

      return array;
}

export default sortArrayByAlphaBeit