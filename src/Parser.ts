import { ReservedTokens, Token } from "./Lexer";

export type Node = {
  kind: string;
  body: Node[] | Token;
};

export type Expression = Node & {
  operator: ReservedTokens;
};

export type Program = {
  kind: "Program";
  body: Node[];
};

export const EOF: string = "|";

export class Parser {
  private static pointer: number = 0;
  private static tokens: Token[] = [];

  public static produceAST(tokens: Token[]): Program {
    Parser.pointer = 0;
    Parser.tokens = tokens;

    const program: Program = {
      body: [],
      kind: "Program",
    };

    while (true) {
      if (Parser.tokens[Parser.pointer].value == EOF) {
        break;
      }

      const node = Parser.produceNode();

      if (node) program.body.push(node);

      Parser.pointer++;
    }

    return program;
  }

  private static produceNode(): Node | undefined {
    const token = Parser.tokens[Parser.pointer];

    switch (token.kind) {
      case "PLUS": {
        return Parser.produceExpression(token.kind);
      };
      case "MINUS": {
        return Parser.produceExpression(token.kind);
      };
      case "MUL": {
        return Parser.produceExpression(token.kind);
      };
      case "DIV": {
        return Parser.produceExpression(token.kind);
      };
    }
  }

  private static produceExpression(operator: ReservedTokens): Expression {
    const lPointer = Parser.pointer - 1;
    const rPointer = Parser.pointer + 1;

    return {
      kind: "Expression",
      operator,
      body: [
        {
          kind: "LHS",
          body: Parser.tokens[lPointer],
        },
        {
          kind: "RHS",
          body: Parser.tokens[rPointer],
        },
      ],
    };
  }
}
