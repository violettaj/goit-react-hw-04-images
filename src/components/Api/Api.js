import axios from 'axios';

const fetchImages = async (topic, currentPage) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${topic}&page=${currentPage}&key=32238732-1ef990d163f563f21632dc5db&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data.hits;
};

export default fetchImages;
