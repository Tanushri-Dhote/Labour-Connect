
const { z } = require("zod");

const selectRoleSchema = z.object({
  role: z.enum(["labour", "employer"]),
});

module.exports = {
  selectRoleSchema,
};