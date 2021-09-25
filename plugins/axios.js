export default function ({ $axios }, inject) {
  const axios = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      },
    }
  });

  inject('axios', axios);
}