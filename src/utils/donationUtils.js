export const getDonationData = donation => {
  // get sum of products
  const sumOfProducts = donation.products.reduce(function(a, b) {
    return a + b.price;
  }, 0);

  // display the ref (5 first chars)
  const donationDisplayRef = '#' + donation._id.substring(donation._id.length - 6).toUpperCase();

  // change date format
  const dateFormat = d => {
    const date = new Date(d);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month =
      parseInt(date.getMonth() + 1) < 10
        ? '0' + parseInt(date.getMonth() + 1)
        : parseInt(date.getMonth() + 1);
    return day + '/' + month + '/' + date.getFullYear();
  };

  const donationDate = dateFormat(donation.created_at);
  let donationUsed;

  if (donation.used_at) {
    donationUsed = dateFormat(donation.used_at);
  }

  return {
    sumOfProducts,
    donationDate,
    donationUsed,
    donationDisplayRef,
  };
};
