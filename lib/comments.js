const noComments = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow source-code comments",
    },
    schema: [],
    messages: {
      unexpectedComment:
        "Comments are not allowed. Express intent with clear names and tests. Put explanations in README.md or docs/ and agent instructions in AGENTS.md.",
    },
  },
  create: (context) => ({
    Program: () => {
      for (const comment of context.sourceCode.getAllComments()) {
        if (comment.type === "Line" || comment.type === "Block") {
          context.report({
            loc: comment.loc,
            messageId: "unexpectedComment",
          });
        }
      }
    },
  }),
};

export default {
  meta: {
    name: "@cartercree/eslint-config/comments",
  },
  rules: {
    none: noComments,
  },
};
