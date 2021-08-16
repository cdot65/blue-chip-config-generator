module.exports = mongoose => {
  const Config = mongoose.model(
    "config",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Config;
};
