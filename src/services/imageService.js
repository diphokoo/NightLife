const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

export const imageService = {
  async uploadEventImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error('Image upload failed');
    return data.data.url;
  },

  async deleteEventImage() {
    // ImgBB free tier does not support deletion via API
  },
};
