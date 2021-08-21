module.exports = mongoose => {
  const Design = mongoose.model(
    "design",
    mongoose.Schema(
      {
        title: String,
        description: String,
        name: String,
        order: Number,
        slug: String,
        avatar: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Design;
};
