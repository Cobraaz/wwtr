import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    results: [
      {
        name: {
          type: String,
          required: true,
        },
        parameters: [
          {
            index: {
              type: Number,
              required: true,
            },
            warning: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              required: true,
            },
            category: {
              type: String,
              required: true,
            },
            weightage: {
              type: Number,
              required: true,
            },
            comment: {
              type: String,
              default: "",
            },
            score: {
              type: Array,
              required: true,
            },

            optionName: [
              {
                name: {
                  type: String,
                  required: true,
                },
                score: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
        optionName: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Results", ResultSchema);
