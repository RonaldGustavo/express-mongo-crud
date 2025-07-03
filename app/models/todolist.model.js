module.exports = (mongoose) => {
  const TodolistSchema = new mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
      },
      activity: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: false,
    }
  );

  TodolistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return { id: _id, ...object };
  });

  return mongoose.model('Todolist', TodolistSchema);
};
