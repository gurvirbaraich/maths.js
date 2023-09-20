import { Lexer } from "./src/Lexer";
import { Parser } from "./src/Parser";

const simpleLine = "5  -  2 * 3 / 4 + 8";

try {
  const tokens = Lexer.tokenize(simpleLine);
  const AST = Parser.produceAST(tokens);

  console.log(AST);
} catch (e) {
  console.log((e as any).message);
}

// TODO: Implement BIDMAS
// Brackets
// Indices
// Division
// Multiplication
// Addition
// Subtraction

// TODO: AST not working properly!!
// FIX: Render the token in tree structure from top to bottom