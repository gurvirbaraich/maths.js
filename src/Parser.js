"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.EOF = void 0;
exports.EOF = "|";
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.produceAST = function (tokens) {
        Parser.pointer = 0;
        Parser.tokens = tokens;
        var program = {
            body: [],
            kind: "Program",
        };
        while (true) {
            if (Parser.tokens[Parser.pointer].value == exports.EOF) {
                break;
            }
            var node = Parser.produceNode();
            if (node)
                program.body.push(node);
            Parser.pointer++;
        }
        return program;
    };
    Parser.produceNode = function () {
        var token = Parser.tokens[Parser.pointer];
        switch (token.kind) {
            case "PLUS":
                {
                    return Parser.produceExpression(token.kind);
                }
                ;
            case "MINUS":
                {
                    return Parser.produceExpression(token.kind);
                }
                ;
            case "MUL":
                {
                    return Parser.produceExpression(token.kind);
                }
                ;
            case "DIV":
                {
                    return Parser.produceExpression(token.kind);
                }
                ;
        }
    };
    Parser.produceExpression = function (operator) {
        var lPointer = Parser.pointer - 1;
        var rPointer = Parser.pointer + 1;
        return {
            kind: "Expression",
            operator: operator,
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
    };
    Parser.pointer = 0;
    Parser.tokens = [];
    return Parser;
}());
exports.Parser = Parser;
