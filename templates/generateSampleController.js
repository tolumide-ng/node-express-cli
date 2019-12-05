module.exports = () => `
export default {
  dummyRoute: (req, res) => {
    return res.status(200).json({
      message: 'This is a sample route',
    });
  }
};

`