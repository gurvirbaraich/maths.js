import { EOF } from "./Parser";

export type ReservedTokens = "PLUS" | "MINUS" | "MUL" | "DIV";

export type Token = {
  kind: string;
  value: string;
};

export class Lexer {
  private static operators: Record<string, ReservedTokens> = {
    "+": "PLUS",
    "-": "MINUS",
    "*": "MUL",
    "/": "DIV",
  };

  public static tokenize(line: string): Token[] {
    let word: string = "";
    const tokens: Token[] = [];

    for (let i = 0; i < line.length; i++) {
      // Store the value of current token being processed
      const currentToken = line[i];

      // Ingore whitespaces
      if (currentToken === " ") {
        continue;
      }

      // If the current token is not a minus (-)
      // and the regex matches the current token
      // means that the current token is invalid - Eg, @ # $ > ?
      if (/[^\w+*\/-]/gm.exec(currentToken) != null) {
        throw new Error(
          `Syntax Error [Lexer]: Found invalid character – ${currentToken} at position ${
            i + 1
          }`
        );
      }

      // If the current token is an operator
      if (Lexer.operators[currentToken] != undefined) {
        if (word) tokens.push({ kind: "number", value: word });

        word = "";
        tokens.push({
          kind: Lexer.operators[currentToken],
          value: currentToken,
        });
      } else word += currentToken;
    }

    if (word) tokens.push({ kind: "number", value: word });

    tokens.push({ kind: "EOF", value: EOF });
    return tokens;
  }
}
