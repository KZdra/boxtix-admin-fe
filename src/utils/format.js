import dayjs from "dayjs";
dayjs.locale("id");

const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }
  const formatDate = (dateString) => {
    return dayjs(dateString).format("D MMMM YYYY");
  };
  export {
    formatRupiah,
    formatDate
  }