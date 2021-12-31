import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParametersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
          default: 0,
        },
        comment: {
          type: String,
          default: "",
        },
        score: {
          type: Array,
          default: [],
        },
        // optionNameOne: {
        //   type: Array,
        //   default: [],
        // },
        optionName: [
          {
            name: {
              type: String,
              default: "",
            },
            score: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
    optionName: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Parameters", ParametersSchema);
